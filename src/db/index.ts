import { Sequelize } from 'sequelize-typescript';

const host = process.env.ORIGIN_DB_HOST || 'localhost';
const username = process.env.ORIGIN_DB_USERNAME;
const password = process.env.ORIGIN_DB_PASSWORD;
const database = process.env.ORIGIN_DB_DATABASE || 'postgres';
const port = +process.env.ORIGIN_DB_PORT || 5432;
const dialect = 'postgres';
const create = process.env.ORIGIN_DB_CREATE ? (process.env.ORIGIN_DB_CREATE.toLowerCase() === 'true') : true;

const url = `${dialect}://${username}:${password}@${host}:${port}/${database}`;

export const sequelize = new Sequelize({
  url,
  pool: {
    max: 20
  },
  modelPaths: [__dirname + '/models']
});

sequelize.addModels([]);

sequelize.sync({alter: create})
   .then(() => {})
   .catch(err => {
     console.log(err);
   });


