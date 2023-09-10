const button = document.getElementById("btn");
const userEmail = document.getElementById("email");
const userPass = document.getElementById("password");

const sequelize = require("./db");

const UserModel = require("./model");

button.addEventListener("click", async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  if (userEmail.value == "") {
    alert("Email пустой");
  }
});
