import { NextFunction } from 'express';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

import { User } from '../models/user';
import { Password } from '../services/password';
const router = express.Router();

router.post('/api/auth/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(new Error('Invalid credential'));
    }

    const passwordMatch = Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      return next(new Error('Invalid credential'));
    }

    // Generate JWT
    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, 'secret');

    res.status(200).send({ token: userJwt })

  });

export { router as signinRouter };
