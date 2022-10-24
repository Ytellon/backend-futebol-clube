import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';
import { ILeaderBoardInterface,
  ILeaderBoardOutInterface } from '../interfaces/leaderBoardInterface';

export default class LeaderBoardService {
  filterGameByHome = async () => {
    const teams = await TeamModel.findAll();
    const homeMatches = await Promise.all(teams.map(
      async (team) => {
        const filterMatch = await this.homeMatches(team.id);
        const newLeaderBoarder = this.gameAccumulatorHome(filterMatch);
        return { name: team.teamName, ...newLeaderBoarder };
      },
    ));
    return homeMatches;
  };

  homeMatches = async (id: number) => {
    const matches = await MatchesModel.findAll({
      where: {
        homeTeam: id,
        inProgress: false,
      },
    });
    return matches;
  };

  gameAccumulatorHome = (matches: ILeaderBoardInterface[]): ILeaderBoardOutInterface => {
    const totalGames = matches.length;
    const totalVic = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    const totalDraw = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    const totalLosses = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    const totalPoints = (totalVic * 3) + totalDraw;
    const goalsFavor = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { totalPoints,
      totalGames,
      totalVictories: totalVic,
      totalDraws: totalDraw,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  };

  filterGameByAway = async () => {
    const teams = await TeamModel.findAll();
    const awayMatches = await Promise.all(teams.map(
      async (team) => {
        const filterMatch = await this.awayMatches(team.id);
        const newLeaderBoarder = this.gameAccumulatorAway(filterMatch);
        return { name: team.teamName, ...newLeaderBoarder };
      },
    ));
    return awayMatches;
  };

  awayMatches = async (id: number) => {
    const matches = await MatchesModel.findAll({
      where: {
        awayTeam: id,
        inProgress: false,
      },
    });
    return matches;
  };

  gameAccumulatorAway = (matches: ILeaderBoardInterface[]): ILeaderBoardOutInterface => {
    const totalGames = matches.length;
    const totalVic = matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
    const totalDraw = matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
    const totalLosses = matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
    const totalPoints = (totalVic * 3) + totalDraw;
    const goalsFavor = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { totalPoints,
      totalGames,
      totalVictories: totalVic,
      totalDraws: totalDraw,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  };

  orderByMatches = (matches: ILeaderBoardOutInterface[]) => {
    const newMatches = matches.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return newMatches;
  };
}
