import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./config/user.routes";
import { createConnection } from "typeorm";

const app = express();
createConnection();
const port = 3000;

// Middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
