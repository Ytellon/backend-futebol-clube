import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/matchesInterface';
import TeamModel from '../database/models/TeamModel';
import CustomError from '../middleware/customError';

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
    const { homeTeam, awayTeam } = match;
    const newMatch = await MatchesModel.create({ ...match, inProgress: true });
    if (homeTeam === awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }
    return newMatch;
  };

  updateMatch = async (id: number): Promise <object> => {
    await MatchesModel.update({
      inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };
}
