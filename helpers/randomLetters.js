const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const randomOne = () => {
  let letters = [];
  let num = 1;
  while (num < 6) {
    const index = Math.floor(Math.random() * 26);
    letters.push(alphabet[index]);
    num++;
  }
  return letters;
};

const randomTwo = () => {
  let letters = [];
  let num = 1;
  while (num < 7) {
    const index = Math.floor(Math.random() * 26);
    letters.push(alphabet[index]);
    num++;
  }
  return letters;
};
const randomThree = () => {
  let letters = [];
  let num = 1;
  while (num < 8) {
    const index = Math.floor(Math.random() * 26);
    letters.push(alphabet[index]);
    num++;
  }
  return letters;
};

const randomLetters = (level) => {
  let letters = [];
  if (level === "1") {
    letters = randomOne();
  } else if (level === "2") {
    letters = randomTwo();
  } else if (level === "3") {
    letters = randomThree();
  }
  return letters.join("");
};

module.exports = {
  randomLetters,
};
