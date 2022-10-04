import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private service: MatchService = new MatchService()) {}

  getMatches = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const matches = await this.service.getMatchByProgress((inProgress === 'true'));
        return res.status(200).json(matches);
      }
      const matches = await this.service.getMatches();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  createMatch = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      const match = await this.service.createMatch(body);
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  };
}
