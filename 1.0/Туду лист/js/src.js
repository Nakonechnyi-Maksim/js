const button = document.getElementById("btn");
const string = document.getElementById("string");
const fillList = document.getElementById("todo");

let todoList = [];

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

button.addEventListener("click", () => {
  let newTodo = {
    todo: string.value,
    checked: false,
  };

  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList));
});

function displayMessages() {
  let displayMessage = "";
  todoList.forEach((item, index) => {
    displayMessage += `
        <li class="list">
            <input type="checkbox" id="item_${index}" ${
      item.checked ? "checked" : ""
    }>
            <label for="item_${index}">${item.todo}</label>
        </li>
    `;
    fillList.innerHTML = displayMessage;
  });
}
