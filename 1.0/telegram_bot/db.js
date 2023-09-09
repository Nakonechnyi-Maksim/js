const { Sequelize } = require("sequelize");

module.exports = new Sequelize("node_postgres", "postgres", "root", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
});
