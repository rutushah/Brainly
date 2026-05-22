import express from 'express';
import { ContentModel } from '../model/ContentModel.js';
import { auth } from '../middleware/middleware.js';

export const contentRouter = express.Router();



// ─── CONTENT ROUTES ───────────────────────────────────────────────────────────
//add user content
contentRouter.post('/content', auth, async (req: express.Request, res: express.Response) => {
    try {
        const { title, link, type, tags } = req.body;

        const content = await ContentModel.create({
            title,
            link,
            type,
            tags,
            userId: req.userId!
        });

        res.status(201).json({ message: "Content created successfully", content });
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

//get content by username
contentRouter.get('/content', auth, async (req: express.Request, res: express.Response) => {
    try {
        const content = await ContentModel.find({
            userId: req.userId!
        }).populate("userId", "username").populate("tags");

        res.json({ content });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//delete the content by user id and content id
contentRouter.delete('/content', auth, async (req: express.Request, res:express.Response) => {
    try {
        const { contentId } = req.body;

        const deleted = await ContentModel.findOneAndDelete({
            _id: contentId,
            userId: req.userId!
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
