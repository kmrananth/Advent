const fs = require("fs")
const day25Data = fs
  .readFileSync("day25Input.txt", "utf8")
  .split("\n")
  .filter((val) => val)
  .map((val) => parseInt(val))
const cardSubject = 7
const refKey = day25Data[0]
let cardPublickey = day25Data[1]
const doorSubject = 7
let doorPublicKey = refKey
let cardLoopSize = 0
let doorLoopSize = 0
let remValue = 20201227
let encKey = 1

do {
  while (cardPublickey % cardSubject !== 0) {
    cardPublickey += remValue
  }
  cardPublickey /= cardSubject
  cardLoopSize++
} while (cardPublickey != 1)

do {
  doorPublicKey %= remValue
  while (doorPublicKey % doorSubject !== 0) {
    doorPublicKey += remValue
  }
  doorPublicKey /= doorSubject
  doorLoopSize++
} while (doorPublicKey != 1)

for (let i = 0; i < cardLoopSize; i++) {
  encKey *= refKey
  encKey %= remValue
}
console.log(encKey)
