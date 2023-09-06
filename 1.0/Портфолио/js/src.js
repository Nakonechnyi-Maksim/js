const button = document.getElementById("btn");
const list = document.querySelector("ul");
const hex = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

list.addEventListener("click", () => {});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

function generateHex() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  return hexColor;
}

button.addEventListener("click",  () => {
  let hexColor = generateHex();
  button.style.backgroundColor = hexColor;
  button.style.border = hexColor;
  button.style.boxShadow = "0px 0px 20px " + hexColor;
  document.getElementById("img").style.borderColor = hexColor;
});
