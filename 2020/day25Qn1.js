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
} while (cardPublickey != 1);

do {
  doorPublicKey %= remValue;
  while (doorPublicKey % doorSubject !== 0) {
    doorPublicKey += remValue;
  }
  doorPublicKey /= doorSubject;
  doorLoopSize++;
} while (doorPublicKey != 1);

for (let i = 0; i < cardLoopSize; i++) {
  encKey *= doorPublicKey;
  encKey %= remValue;
}
console.log(encKey);
