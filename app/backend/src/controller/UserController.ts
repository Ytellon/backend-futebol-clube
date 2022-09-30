import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private service: UserService = new UserService()) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.login({ email, password });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  loginValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = res.locals.user;
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
