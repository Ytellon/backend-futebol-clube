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

  getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
