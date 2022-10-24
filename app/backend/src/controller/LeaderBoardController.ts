import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private service: LeaderBoardService = new LeaderBoardService()) {}

  getLeaderBoardHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await this.service.filterGameByHome();
      const sortLeaderBoard = await this.service.orderByMatches(leaderBoard);
      return res.status(200).json(sortLeaderBoard);
    } catch (error) {
      next(error);
    }
  };

  getLeaderBoardAway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await this.service.filterGameByAway();
      const sortLeaderBoard = await this.service.orderByMatches(leaderBoard);
      return res.status(200).json(sortLeaderBoard);
    } catch (error) {
      next(error);
    }
  };
}
