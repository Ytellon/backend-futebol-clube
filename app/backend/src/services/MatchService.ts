import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/matchesInterface';
import TeamModel from '../database/models/TeamModel';
import CustomError from '../middleware/customError';

export default class MatchService {
  getMatches = async (): Promise<IMatch[]> => {
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

  getMatchByProgress = async (progress: boolean): Promise<IMatch[]> => {
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

  createMatch = async (match: IMatch): Promise<IMatch> => {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new CustomError(
        401,
        'It is not possible to create a match with two equal teams',
      );
    }
    const hTeam = await TeamModel.findOne({ where: { id: homeTeam } });
    const aTeam = await TeamModel.findOne({ where: { id: awayTeam } });
    if (!hTeam || !aTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }
    const newMatch = await MatchesModel.create({ ...match, inProgress: true });
    return newMatch;
  };

  updateMatch = async (id: number): Promise<object> => {
    await MatchesModel.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );
    return { message: 'Finished' };
  };

  updateScore = async (
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<string> => {
    const match = await MatchesModel.findOne({ where: { id } });
    if (!match) throw new CustomError(404, 'There is no match with such id!');
    if (!match.inProgress) throw new CustomError(401, 'The match is already finished');
    await MatchesModel.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
    return 'Score updated';
  };
}
