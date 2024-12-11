import express from 'express';
import authRouter from './modules/router/auth.router';
import { sessionMiddleware } from './modules/middleware/session.middleware';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(sessionMiddleware);

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}!`);
});