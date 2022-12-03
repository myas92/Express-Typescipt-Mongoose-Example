
import mongoose from "mongoose";
import express from "express";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";

const app = express();

app.use(json());
app.use(signinRouter);
app.use(signupRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  return next(new Error('Invalid route'));
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message || "an unknown error occurred!",
  });
});

// Connecting to Mongodb
const initializeConfig = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/auth');
    console.log('Connected to MongoDb')
  } catch (error) {
    console.log(error)
  }
}

app.listen(3000, async () => {
  await initializeConfig()
  console.log("Listening on port 3000!!!!!");
});
