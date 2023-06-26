import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './RRHH_DB.sqlite',
});

sequelize
  .authenticate()
  .then(() =>
    console.log('Database connection has been established successfully.'),
  )
  .catch(e => console.error('Unable to connect to the database:', e.message));

export default sequelize;
