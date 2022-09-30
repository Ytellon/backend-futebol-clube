import { Request, Response, NextFunction } from 'express';

import CustomError from './customError';

import { IUserLogin } from '../interfaces/userInterface';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as IUserLogin;
  if (!email || !password) {
    throw new CustomError(400, 'All fields must be filled');
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    throw new CustomError(400, 'Incorrect email or password');
  }
  next();
};

export default validateLogin;
