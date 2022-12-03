import express, { Request, Response, NextFunction } from "express";
import { User } from '../models/user'
const router = express.Router();

router.post(
  "/api/users/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return next(new Error('Email in use'));
    }

    // Create User 
    const user = User.build({
      email,
      password,
    })
    // Save in MongoDB
    await user.save();
    res.status(201).send({ user })
  }
);

export { router as signupRouter };
