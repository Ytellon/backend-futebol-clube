import TeamModel from '../database/models/TeamModel';
import { ITeam } from '../interfaces/teamsInterface';
import CustomError from '../middleware/customError';

export default class TeamService {
  getTeams = async (): Promise <ITeam[]> => {
    const teams = await TeamModel.findAll();
    return teams;
  };

  getTeamById = async (id: number): Promise <ITeam | null> => {
    const team = await TeamModel.findByPk(id);
    if (!team) {
      throw new CustomError(404, `Team with id ${id} not found`);
    }
    return team;
  };
}
