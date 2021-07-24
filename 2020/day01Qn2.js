const fs = require("fs");

fileData.forEach((val) => {
  fileData.forEach((val1) => {
    const val2 = 2020 - val - val1;
    if (fileData.includes(val2)) {
      console.log(val, val1, val2, val * val1 * val2);
    }
  });
});
