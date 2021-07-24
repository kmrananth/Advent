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

const updateDeck = function (winner, deck) {
  let player1Deck = deck.player1;
  let player2Deck = deck.player2;
  const compr = deck.cmpr.map((val) => val);
  let player1Val = player1Deck.shift();
  let player2Val = player2Deck.shift();
  if (winner === "player1") {
    player1Deck.push(player1Val);
    player1Deck.push(player2Val);
  } else {
    player2Deck.push(player2Val);
    player2Deck.push(player1Val);
  }
  return {
    player1: player1Deck,
    player2: player2Deck,
    cmpr: compr,
  };
};

const game = function (deck) {
  // console.log(deck);
  let player1Deck = deck.player1.map((val) => val);
  let player1Cmpr = player1Deck.join(",");
  let player2Deck = deck.player2.map((val) => val);
  let player1Len = player1Deck.length;
  let player2Len = player2Deck.length;
  let player1Val = player1Deck.shift();
  let player2Val = player2Deck.shift();
  if (deck.cmpr.find((val) => val === player1Cmpr)) {
    // console.log("Player1Win");
    deck = updateDeck("player1", deck);
    return deck;
  } else {
    if (player1Val <= player1Len - 1 && player2Val <= player2Len - 1) {
      const deck1 = game({
        player1: player1Deck.filter((val, i) => i < player1Val),
        player2: player2Deck.filter((val, i) => i < player2Val),
        cmpr: [],
      });
      if (deck1.player1.length) {
        deck = updateDeck("player1", deck);
      } else {
        deck = updateDeck("player2", deck);
      }
      deck = game(deck);
      return deck;
    } else {
      if (player1Len > 0 && player2Len > 0) {
        if (player1Val > player2Val) {
          deck = updateDeck("player1", deck);
        } else {
          deck = updateDeck("player2", deck);
        }
        deck.cmpr.push(player1Cmpr);
        deck = game(deck);
        return deck;
      } else {
        return deck;
      }
    }
  }
};
const final = game({ player1, player2, cmpr: [] });
console.log(final);
const winner =
  final.player1.length === 0
    ? final.player2.map((val) => val)
    : final.player1.map((val) => val);

let len = winner.length;
console.log(
  winner.reduce((aggr, val, i) => {
    aggr += +val * (len - i);
    return aggr;
  }, 0)
);
