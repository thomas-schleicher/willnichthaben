import express, { Request, Response} from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Willnichthaben!");
});

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}!`);
});