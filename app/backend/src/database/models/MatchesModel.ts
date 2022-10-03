import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class Matches extends Model {
  id!: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Matches.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
