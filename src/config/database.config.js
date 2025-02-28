import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "reservation_system",
  "root",
  "lJDQ#R&6c1RnCQ$zvuHmy%Vg$kgVOE7l",
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión con la base de datos establecida ❤️");
    await sequelize.sync({ logging: false });
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
