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

  getMatchByProgress = async (progress: boolean): Promise <IMatch[]> => {
    const matches = await MatchesModel.findAll({
      where: {
        inProgress: progress,
      },
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

  createMatch = async (match: IMatch): Promise <IMatch> => {
    const newMatch = await MatchesModel.create({ ...match, inProgress: true });
    return newMatch;
  };

  updateMatch = async (id: number): Promise <object> => {
    await MatchesModel.update({
      inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };
}
