const image = document.querySelector(".img");
const card = document.querySelector(".card");

image.addEventListener("click", () => {
  card.innerHTML = `
          <img class="img" src="img/02.png" alt="Гуль" />
          <p>Гуль</p>
      `;
});
