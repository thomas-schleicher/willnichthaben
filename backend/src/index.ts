import express from "express";
import authRouter from "./modules/router/auth.router";
import { sessionMiddleware } from "./modules/middleware/session.middleware";
import userRouter from "./modules/router/user.router";
import cors from "cors";
import vehicleRouter from "./modules/router/vehicle.router";
import listingRouter from "./modules/router/listing.router";

const app = express();
const PORT = 3000;

//nessessary for local development
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(sessionMiddleware);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/listing", listingRouter);
app.use("/vehicle", vehicleRouter);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}!`);
});