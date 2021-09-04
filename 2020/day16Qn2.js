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

const otherTicketsNew = otherTickets.filter((val) =>
  val.every((val1) => matchVal(val1))
);

let fieldsMap = new Map();
const fields = Array.from(seqMap.keys());
for (let i = 0; i < fields.length; i++) fieldsMap.set(i, fields);
const removeField = function (keyVal, field) {
  fieldsMap.forEach((val, i) => {
    if (i !== keyVal && val.includes(field)) {
      val = val.filter((val1) => val1 !== field);

      fieldsMap.set(i, val);
      if (val.length === 1) removeField(i, val[0]);
    }
  });
  return;
};
const checkMap = function (value) {
  value.forEach((val, i) => {
    let fieldArray = fieldsMap.get(i);
    fieldArray.forEach((val1) => {
      let temp = seqMap.get(val1);
      if (
        !(
          (val >= temp[0][0] && val <= temp[0][1]) ||
          (val >= temp[1][0] && val <= temp[1][1])
        )
      ) {
        fieldArray = fieldArray.filter((val2) => val2 !== val1);
      }
    });
    fieldsMap.set(i, fieldArray);
    if (fieldArray.length === 1) removeField(i, fieldArray[0]);
  });
};
otherTicketsNew.forEach((val) => checkMap(val));
const departure = Array.from(fieldsMap)
  .filter((val) => val[1][0].includes("departure"))
  .map((val1) => val1[0]);
let finalVal = 1;
departure.forEach((val) => (finalVal *= myTicket[val]));
console.log(finalVal);
