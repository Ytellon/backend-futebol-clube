import TeamModel from '../database/models/TeamModel';
import { ITeam } from '../interfaces/teamsInterface';

export default class TeamService {
  getTeams = async (): Promise <ITeam[]> => {
    const teams = await TeamModel.findAll();
    return teams;
  };
}
