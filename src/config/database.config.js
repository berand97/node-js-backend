import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "authentication",
  "root",
  "lJDQ#R&6c1RnCQ$zvuHmy%Vg$kgVOE7l",
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Conexión con la base de datos establecida ❤️");
    await sequelize.sync({ alter: true });
  })
  .catch((error) => {
    console.log(error);
  });

export default sequelize;
