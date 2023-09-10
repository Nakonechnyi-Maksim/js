const { Sequelize } = require("sequelize");

module.exports = new Sequelize("", "postgres", "root", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
});
