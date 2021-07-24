const fs = require("fs");
const cardSubject = 7;
let cardPublickey = 2959251;
const doorSubject = 7;
let doorPublicKey = 4542595;
let cardLoopSize = 0;
let doorLoopSize = 0;
let remValue = 20201227;
let encKey = 1;

do {
  while (cardPublickey % cardSubject !== 0) {
    cardPublickey += remValue;
  }
  cardPublickey /= cardSubject;
  cardLoopSize++;
  // console.log(cardLoopSize, cardPublickey);
} while (cardPublickey != 1);

do {
  doorPublicKey %= remValue;
  while (doorPublicKey % doorSubject !== 0) {
    doorPublicKey += remValue;
  }
  doorPublicKey /= doorSubject;
  doorLoopSize++;
  // console.log(doorLoopSize, doorPublicKey);
} while (doorPublicKey != 1);

console.log(cardLoopSize, doorLoopSize);

for (let i = 0; i < cardLoopSize; i++) {
  encKey *= 4542595;
  encKey %= remValue;
}
console.log(encKey);
