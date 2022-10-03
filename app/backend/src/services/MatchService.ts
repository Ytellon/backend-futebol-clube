import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/matchesInterface';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  getMatches = async (): Promise <IMatch[]> => {
    const matches = await MatchesModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  };
}
