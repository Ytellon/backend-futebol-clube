import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);
