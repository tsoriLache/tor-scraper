import { Model, DataTypes } from 'sequelize';
import sequelize from './config';

class Paste extends Model {}
Paste.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    date_utc: DataTypes.BIGINT,
    content: DataTypes.STRING,
    author: DataTypes.STRING,
    tags: DataTypes.STRING,
  },
  { sequelize, modelName: 'paste', createdAt: false, timestamps: false }
);

export { sequelize, Paste };
