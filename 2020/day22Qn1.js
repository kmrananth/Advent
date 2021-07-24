const fs = require("fs");
const day22Data = fs.readFileSync("day22Input.txt", "utf8").split("\n");
let player1 = [];
let player2 = [];

let currentPlayer;
day22Data
  .filter((val1) => val1.length > 0)
  .forEach((val) => {
    if (val.startsWith("Player")) {
      if (val.endsWith("1:")) currentPlayer = "player1";
      else currentPlayer = "player2";
    } else {
      if (currentPlayer === "player1") player1.push(+val);
      else player2.push(+val);
    }
  });
while (player1.length > 0 && player2.length > 0) {
  const player1Val = player1.shift();
  const player2Val = player2.shift();
  if (player1Val > player2Val) {
    player1.push(player1Val);
    player1.push(player2Val);
  } else {
    player2.push(player2Val);
    player2.push(player1Val);
  }
}

const winner =
  player1.length === 0 ? player2.map((val) => val) : player1.map((val) => val);

let len = winner.length;
console.log(
  winner.reduce((aggr, val, i) => {
    aggr += +val * (len - i);
    return aggr;
  }, 0)
);
