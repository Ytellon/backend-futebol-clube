import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const wordSecretJwt = process.env.JWT_SECRET as string;

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, wordSecretJwt);
    res.locals.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
