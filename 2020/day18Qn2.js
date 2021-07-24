const fs = require("fs");
const day18Data = fs.readFileSync("day18Input.txt", "utf8").split("\n");
let final = 0;
const evaluate = (expr, p1) => {
  if (p1.includes("+") && p1.includes("*")) {
    do {
      p1 = p1.replace(/([\d]+\s+[+]\s+[\d]+)/, evaluate);
    } while (p1.includes("+"));
  }
  return eval(p1.valueOf());
};
day18Data.forEach((temp) => {
  do {
    temp = temp.replace(/\(([\d+*\s]+)\)/, evaluate);
  } while (temp.includes("("));
  final += +evaluate(temp, temp);
});
console.log(final);
