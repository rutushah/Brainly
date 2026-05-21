import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express from 'express';

const app = express();
app.use(express.json());

// Extend Express Request type to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

import { UserModel, ContentModel, TagModel, LinkModel } from './db.js';
import { JWT_SECRET, dbUsername, dbPassword } from './config.js';


// ─── SIGNUP ───────────────────────────────────────────────────────────────────
app.post('/api/v1/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9]{3,10}$/;
    if (!usernameRegex.test(username)) {
        res.status(411).json({
            message: 'Username must be between 3 and 10 characters and can only contain letters and numbers.'
        });
        return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        res.status(411).json({
            message: "Password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        });
        return;
    }

    try {
        await UserModel.create({ username, password, name });

        res.status(201).json({
            message: 'You have successfully signed up!!'
        });
    } catch (err: any) {
        if (err.code === 11000) {
            res.status(403).json({
                message: "Username already exists. Please choose a different username."
            });
        } else {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
});


// ─── SIGNIN ───────────────────────────────────────────────────────────────────
app.post('/api/v1/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username, password });

        if (user) {
            const token = jwt.sign(
                { id: user._id.toString() },
                JWT_SECRET
            );

            res.json({
                message: 'You have successfully signed in!!',
                token: token
            });
        } else {
            res.status(403).json({
                message: 'Invalid username or password.'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const token = req.headers.token as string;

        if (!token) {
            res.status(403).json({ message: "No token provided" });
            return;
        }

        const decodedData = jwt.verify(token, JWT_SECRET) as { id: string };
        req.userId = decodedData.id;
        next();
    } catch (err) {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
}


// ─── CONTENT ROUTES ───────────────────────────────────────────────────────────

// Create content
app.post('/api/v1/content', auth, async (req, res) => {
    try {
        const { title, link, type, tags } = req.body;

        const content = await ContentModel.create({
            title,
            link,
            type,
            tags,
            userId: req.userId!
        });

        res.status(201).json({
            message: "Content created successfully",
            content
        });
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

// Get all content for the authenticated user
app.get('/api/v1/content', auth, async (req, res) => {
    try {
        const content = await ContentModel.find({
            userId: req.userId!
        }).populate("userId", "username").populate("tags")

        res.json({ content });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete content by ID
app.delete('/api/v1/content', auth, async (req, res) => {
    try {
        const { contentId } = req.body;

        const deleted = await ContentModel.findOneAndDelete({
            _id: contentId,
            userId: req.userId!  // ensures users can only delete their own content
        });

        if (!deleted) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }

        res.json({ message: "Content deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// ─── BRAIN / SHARE ROUTES ─────────────────────────────────────────────────────

// Enable or disable sharing of user's brain
app.post('/api/v1/brain/share', auth, async (req, res) => {
    try {
        const { share } = req.body; // boolean: true to share, false to unshare

        if (share) {
            // Generate a unique share link and save it
            const shareToken = jwt.sign({ userId: req.userId }, JWT_SECRET);

            await LinkModel.findOneAndUpdate(
                { userId: req.userId! },
                { hash: shareToken },
                { upsert: true, new: true }
            );

            res.json({
                message: "Sharing enabled",
                shareLink: shareToken
            });
        } else {
            await LinkModel.findOneAndDelete({ userId: req.userId! });

            res.json({ message: "Sharing disabled" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch another user's shared content via share link
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    try {
        const { shareLink } = req.params;

        const link = await LinkModel.findOne({ hash: shareLink });

        if (!link) {
            res.status(404).json({ message: "Share link not found or has been disabled" });
            return;
        }

        const content = await ContentModel.find({ userId: link.userId });
        const user = await UserModel.findById(link.userId).select('name username');

        res.json({ user, content });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(3000, () => {
    console.log('Server running on port 3000');
});