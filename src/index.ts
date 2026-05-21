import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express from 'express';
import { UserModel, ContentModel, LinkModel } from './db.js';
import { JWT_SECRET, dbUsername, dbPassword } from './config.js';
import { auth } from './middleware.js';
import { userRouter } from './userLogin.js';
import { contentRouter } from './content.js';
import { shareLinkRouter } from './shareLink.js';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const app = express();
app.use(express.json());
app.use('/api/v1', userRouter);
app.use('/api/v1', contentRouter);
app.use('/api/v1/brain', shareLinkRouter)

// mongoose
//     .connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.zwa3ewd.mongodb.net/brainly`)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err));


// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
