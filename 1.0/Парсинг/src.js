const mainEl = document.getElementById("head");
const wrapper = document.createElement("div");

const formEl = document.createElement("form");
formEl.classList.add("search");
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputsValue = Object.fromEntries(new FormData(e.target));
  console.log(inputsValue.name);
  const response = await fetch(
    `https://api.github.com/users/${inputsValue.name}`
  );
  const data = await response.json();
  console.log(data);

  if (response.ok) {
    wrapper.appendChild(createProfileEl(data));
    mainEl.appendChild(wrapper);
  } else {
    alert("Пользователь на найден");
  }
});

const inputEl = document.createElement("input");
inputEl.classList.add("search-input");
inputEl.setAttribute("name", "name");

const searchBtnEl = document.createElement("button");
searchBtnEl.classList.add("search-btn");
searchBtnEl.setAttribute("type", "submit");
searchBtnEl.innerText = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchBtnEl);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
  const element = document.createElement("div");
  element.classList.add("profile");
  element.innerHTML += `
    <img class="search-image" src=${profileData.avatar_url}></img>
    <p class="search-text"><span>Имя: </span>${profileData.name}</p>
    <p class="search-text"><span>Город: </span>${profileData.location}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
    `;
  element.appendChild(deleteEl());
  return element;
}

function deleteEl() {
  const element = document.createElement("button");
  element.classList.add("delete-btn");
  element.innerText = "Удалить";
  element.addEventListener("click", (e) => {
    wrapper.innerHTML = "";
  });

  return element;
}
