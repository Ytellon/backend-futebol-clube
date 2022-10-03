import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private service: TeamService = new TeamService()) {}

  getTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.getTeams();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
