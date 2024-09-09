import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'mariadb',  // Change dialect to 'mariadb'
  logging: false,
});

export default sequelize;
