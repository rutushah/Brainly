import express from 'express';
import { LinkModel } from '../model/LinkModel.js';
import { ContentModel } from '../model/ContentModel.js';
import { UserModel } from '../model/UserModel.js';
import { auth } from '../middleware/middleware.js';
import { random } from './utils.js';

export const shareLinkRouter = express.Router();

shareLinkRouter.post('/share', auth, async (req, res) => {
    try {
        const  share  = req.body.share;

        if (share) {
            const hash = random(10);
            await LinkModel.create({ userId: req.userId!, hash });
            res.json({ message: "Sharing enabled", shareLink: hash });
        } else {
            await LinkModel.deleteOne({ userId: req.userId! });
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