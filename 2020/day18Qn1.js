const fs = require("fs");
const day18Data = fs.readFileSync("day18Input.txt", "utf8").split("\n");
const checkOperator = new RegExp("[+|*]");
const checkOperand = new RegExp("[0-9]+");
let final = 0;
const evaluation = function (temp) {
  let stack = [];
  let flag = true;
  temp.forEach((val2) => {
    const stackLength = stack.length;
    if (val2 === "(" || val2.search(checkOperator) === 0) {
      stack.push(val2);
    } else if (
      val2.search(checkOperand) === 0 &&
      stackLength > 0 &&
      stack[stackLength - 1].search(checkOperator) === 0
    ) {
      let operator = stack.pop();
      let operand1 = stack.pop();
      stack.push(`${eval(`${operand1} ${operator} ${val2}`)}`);
    } else if (val2 === ")") {
      let temp2 = stack.pop();
      stack.pop();
      stack.push(temp2);
      let temp1 = stack.map((val) => val);
      stack = evaluation(temp1).map((val) => val);
    } else {
      stack.push(val2);
    }
    // console.log(val2, stack);
  });
  return stack;
};
day18Data.forEach((val, i) => {
  const temp = val.split("").filter((val1) => val1 !== " ");
  // console.log(evaluation(temp)[0]);
  final += +evaluation(temp);
});
console.log(final);
