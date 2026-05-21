import jwt from 'jsonwebtoken';
import express from 'express';
import { LinkModel, TagModel, ContentModel, UserModel } from './db.js';
import { auth } from './middleware.js';
import { JWT_SECRET } from './config.js';

export const shareLinkRouter = express.Router();






// ─── BRAIN / SHARE ROUTES ─────────────────────────────────────────────────────

shareLinkRouter.post('/share', auth, async (req, res) => {
    try {
        const { share } = req.body;

        if (share) {
            const shareToken = jwt.sign({ userId: req.userId }, JWT_SECRET);

            await LinkModel.findOneAndUpdate(
                { userId: req.userId! },
                { hash: shareToken },
                { upsert: true, new: true }
            );

            res.json({ message: "Sharing enabled", shareLink: shareToken });
        } else {
            await LinkModel.findOneAndDelete({ userId: req.userId! });
            res.json({ message: "Sharing disabled" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

shareLinkRouter.get('/:shareLink', async (req, res) => {
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