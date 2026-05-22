import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express from 'express';
import { ContentModel } from './model/ContentModel.js';
import { UserModel } from './model/UserModel.js';
import { LinkModel } from './model/LinkModel.js';

import { JWT_SECRET, dbUsername, dbPassword } from './configs/config.js';
import { auth } from './middleware/middleware.js';
import { userRouter } from './controller/userLogin.js';
import { contentRouter } from './controller/content.js';
import { shareLinkRouter } from './controller/shareLink.js';

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
app.use('/api/v1/brain', shareLinkRouter);

// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
