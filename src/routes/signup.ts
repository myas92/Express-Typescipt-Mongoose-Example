import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { User } from '../models/user'
const router = express.Router();

router.post(
  "/api/auth/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new Error('Email in use'));
    }

    const user = User.build({
      email,
      password,
    })

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, 'secret');

    await user.save();
    res.status(201).send({ user, token: userJwt })
  }
);

export { router as signupRouter };
