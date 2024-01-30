import {config} from 'dotenv'
import {Sequelize} from 'sequelize';

config()
const PORT = process.env.DB_PORT ? +process.env.DB_PORT : 5432;

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: PORT,
  dialect: 'postgres',
});
