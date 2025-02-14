import express from "express";
import authRouter from "./modules/router/auth.router";
import { sessionMiddleware } from "./modules/middleware/session.middleware";
import userRouter from "./modules/router/user.router";
import cors from "cors";
import vehicleRouter from "./modules/router/vehicle.router";
import listingRouter from "./modules/router/listing.router";
import retailRouter from "./modules/router/retail.router";
import path from "path";

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
app.use("/retail", retailRouter);

// static route for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}!`);
});