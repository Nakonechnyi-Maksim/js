const button = document.getElementById("btn");
const userEmail = document.getElementById("email");
const userPass = document.getElementById("password");

button.addEventListener("click", () => {
  if (userEmail.value == "") {
    alert("Email пустой");
  }
});
