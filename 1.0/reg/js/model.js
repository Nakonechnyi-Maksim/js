const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

module.exports = User;
