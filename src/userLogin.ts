import jwt from 'jsonwebtoken';
import express from 'express';
import { UserModel } from './db.js';
import { JWT_SECRET } from './config.js';

export const userRouter = express.Router();

// ─── SIGNUP ───────────────────────────────────────────────────────────────────
userRouter.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const usernameRegex = /^[a-zA-Z0-9]{3,10}$/;
    if (!usernameRegex.test(username)) {
        res.status(411).json({
            message: 'Username must be between 3 and 10 characters and can only contain letters and numbers.'
        });
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        res.status(411).json({
            message: "Password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        });
        return;
    }

    try {
        await UserModel.create({ username, password, name });
        res.status(201).json({ message: 'You have successfully signed up!!' });
    } catch (err: any) {
        if (err.code === 11000) {
            res.status(403).json({ message: "Username already exists. Please choose a different username." });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});


// ─── SIGNIN ───────────────────────────────────────────────────────────────────
userRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username, password });

        if (user) {
            const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
            res.json({ message: 'You have successfully signed in!!', token });
        } else {
            res.status(403).json({ message: 'Invalid username or password.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
