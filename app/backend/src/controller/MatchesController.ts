import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private service: MatchService = new MatchService()) {}

  getMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.getMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}
