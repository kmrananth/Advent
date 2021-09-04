const fs = require("fs");
const day16Data = fs.readFileSync("day16Input.txt", "utf8").split("\n");
let seqMap = new Map();
let myTicket = [];
let otherTickets = [];
let flag = "";

const matchVal = (value) => {
  return Array.from(seqMap.values())
    .flatMap((val) => val)
    .some((val) => value >= val[0] && value <= val[1]);
};
day16Data.forEach((val) => {
  if (flag === "" && val !== "") {
    let temp = val.split(": ");
    let temp1 = temp[1].split(" or ");
    seqMap.set(
      temp[0],
      temp1.map((val) => val.split("-").map((val1) => +val1))
    );
  } else if (val === "your ticket:" || val === "nearby tickets:") {
  } else if (flag === "" && val === "") {
    flag = "myTkt";
  } else if (flag === "myTkt") {
    myTicket = val.split(",").map((val) => +val);
    flag = "other";
  } else if (flag === "other" && val !== "") {
    otherTickets.push(val.split(",").map((val) => +val));
  }
});

console.log(
  otherTickets
    .flatMap((val) => val)
    .filter((val1) => !matchVal(val1))
    .reduce((acc, val2) => acc + val2, 0)
);
