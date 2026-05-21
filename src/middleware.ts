import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();
app.use(express.json());
import { JWT_SECRET} from './config.js';


// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
export function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
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