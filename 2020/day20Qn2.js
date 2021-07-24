const fs = require("fs");
day20Data = fs.readFileSync("day20Input.txt", "utf8");
tileData = day20Data.split("\n\n").map((val) => val.split("\n"));
let tileMap = new Map();
let tileMap1 = new Map();
let orntMap = new Map();
orntMap.set(0, 2);
orntMap.set(1, 3);
orntMap.set(2, 0);
orntMap.set(3, 1);
tileData.forEach((val) => {
  const tile = /Tile ([\d]+):/.exec(val[0])[1];
  const side1 = val[1];
  const side3 = val[val.length - 1];
  let side2 = "";
  let side4 = "";
  const side2Pos = val[1].length - 1;
  val.slice(1).forEach((val1) => {
    side2 += val1[side2Pos];
    side4 += val1[0];
  });
  const valObj = {
    link: new Map(),
    ornt: "",
    sides: [side1.trim(), side2.trim(), side3.trim(), side4.trim()],
  };
  const valObj1 = {
    link: new Map(),
    ornt: "",
    sides: [side1.trim(), side2.trim(), side3.trim(), side4.trim()],
    tileVal: val.slice(1),
  };

  tileMap.set(tile, valObj);
  tileMap1.set(tile, valObj1);
});
const findMatch = function (val, sides, i, itr, maxItr) {
  if (itr === maxItr - 1 || val === sides[i]) {
    return { match: val === sides[i], sides: sides };
  } else {
    itr++;
    sides.push(sides.shift());
    if (itr === maxItr / 2) {
      sides = sides.map((val) => val.split("").reverse().join(""));
    }
    return findMatch(val, sides, i, itr, maxItr);
  }
};

tileMap.forEach((val, key) => {
  let tileMapTemp = new Map(tileMap);
  tileMapTemp.delete(key);
  for (let i = 0; i < 4; i++) {
    tileMapTemp.forEach((val1, key1) => {
      let temp1Sides = val1.sides.map((val2) => val2);
      let temp = findMatch(val.sides[i], temp1Sides, orntMap.get(i), 0, 8);
      if (temp.match) {
        val1.sides = temp.sides.map((val4) => val4);
      }
      if (val.sides[i] === val1.sides[orntMap.get(i)]) {
        val.link.set(key1, val.sides[i]);
        val1.link.set(key, val.sides[i]);
      }
    });
  }
});

const corners = [...tileMap]
  .filter((val) => [...val[1].link].length === 2)
  .map((val) => val[0]);

// console.log(tileMap);
let tileOrder = [];
let tileRow = [corners[0], [...tileMap.get(corners[0]).link][0][0]];
do {
  let current = tileRow[tileRow.length - 1];
  let currentLink = [...tileMap.get(current).link.keys()]
    .filter((val) => !tileRow.includes(val))
    .filter(
      (val) =>
        [...tileMap.get(val).link.keys()].filter(
          (val1) => !tileRow.includes(val1)
        ).length < 3
    );
  tileRow.push(...currentLink);
} while (tileMap.get(tileRow[tileRow.length - 1]).link.size > 2);
tileOrder.push(tileRow);
let tempOrder = tileRow.map((val) => val);
let tempCorners = corners.filter((val) => !tempOrder.includes(val));

do {
  let firstCol = Array.from(
    tileMap.get(tileOrder[tileOrder.length - 1][0]).link.keys()
  ).filter((val) => !tileOrder.join().includes(val))[0];
  let secondCol = Array.from(tileMap.get(firstCol).link.keys()).filter(
    (val) => tileMap.get(val).link.size > 3
  )[0];
  tileRow = [firstCol, secondCol];
  tempOrder.push(firstCol);
  tempOrder.push(secondCol);
  do {
    let current = tileRow[tileRow.length - 1];
    let currentLink = [...tileMap.get(current).link.keys()]
      .filter((val) => !tempOrder.includes(val))
      .filter(
        (val) =>
          ([...tileMap.get(val).link.keys()].filter(
            (val1) => !tempOrder.includes(val1)
          ).length === 2 &&
            tileMap.get(val).link.size === 4) ||
          ([...tileMap.get(val).link.keys()].filter(
            (val1) => !tempOrder.includes(val1)
          ).length === 1 &&
            tileMap.get(val).link.size === 3)
      );
    tileRow.push(...currentLink);
    tempOrder.push(...currentLink);
  } while (tileMap.get(tileRow[tileRow.length - 1]).link.size > 3);
  tileOrder.push(tileRow);
} while (
  !tempCorners.some((val) =>
    Array.from(
      tileMap.get(tempOrder[tempOrder.length - 1]).link.keys()
    ).includes(val)
  )
);

let firstCol = Array.from(
  tileMap.get(tileOrder[tileOrder.length - 1][0]).link.keys()
).filter((val) => !tileOrder.join().includes(val))[0];
let secondCol = Array.from(tileMap.get(firstCol).link.keys()).filter(
  (val) => tileMap.get(val).link.size === 3
)[0];
tileRow = [firstCol, secondCol];
tempOrder.push(firstCol);
tempOrder.push(secondCol);
do {
  let current = tileRow[tileRow.length - 1];
  let currentLink = [...tileMap.get(current).link.keys()].filter(
    (val) => !tempOrder.includes(val)
  );
  tileRow.push(...currentLink);
  tempOrder.push(...currentLink);
} while (tileMap.get(tileRow[tileRow.length - 1]).link.size > 2);
tileOrder.push(tileRow);

const orntCalc = function (actSide, expSide, itr) {
  if (
    (actSide[0].includes(expSide[0]) ||
      actSide[0].includes(expSide[0].split("").reverse().join(""))) &&
    (actSide[1].includes(expSide[1]) ||
      actSide[1].includes(expSide[1].split("").reverse().join(""))) &&
    (actSide[2].includes(expSide[2]) ||
      actSide[2].includes(expSide[2].split("").reverse().join(""))) &&
    (actSide[3].includes(expSide[3]) ||
      actSide[3].includes(expSide[3].split("").reverse().join("")))
  ) {
    return itr;
  } else {
    itr++;
    if (itr === 4) {
      let temp = actSide[0];
      actSide[0] = actSide[3];
      actSide[3] = temp;
      temp = actSide[1];
      actSide[1] = actSide[2];
      actSide[2] = temp;
    } else {
      actSide.unshift(actSide.pop().split("").reverse().join(""));
      actSide[2] = actSide[2].split("").reverse().join("");
    }
    return orntCalc(actSide, expSide, itr);
  }
};

tileMap.forEach((val, key) => {
  const temp = val.link;
  const temp1 = tileMap1.get(key);
  temp1.link = temp;
  tileMap1.set(key, temp1);
});

const rowNum = tileOrder.length;
const colNum = tileOrder[0].length;
for (let i = 0; i < rowNum; i++) {
  for (let j = 0; j < colNum; j++) {
    let temp = tileMap1.get(tileOrder[i][j]);
    let compSide = [];
    if (i > 0) compSide.push(temp.link.get(tileOrder[i - 1][j]));
    else compSide.push(".");
    if (j < colNum - 1) compSide.push(temp.link.get(tileOrder[i][j + 1]));
    else compSide.push(".");
    if (i < rowNum - 1) compSide.push(temp.link.get(tileOrder[i + 1][j]));
    else compSide.push(".");
    if (j > 0) compSide.push(temp.link.get(tileOrder[i][j - 1]));
    else compSide.push(".");
    // console.log(tileOrder[i][j], orntCalc(temp.sides, compSide, 0));
    temp.ornt = orntCalc(temp.sides, compSide, 0);
  }
}
// console.log(tileMap1);
const reverse = function (tile) {
  return tile.map((val) => val.split("").reverse().join(""));
};

const invert = function (tile) {
  let tile1 = [];
  while (tile.length) {
    tile1.push(tile.pop());
  }
  return tile1;
};

const trans = function (tile) {
  let tile1 = [];
  tile.forEach((val) => {
    val.split("").forEach((val1, i) => {
      tile1[i] = tile1[i] ? tile1[i] + val1 : val1;
    });
  });
  return tile1;
};

const changeOrnt = function (tile, ornt) {
  switch (ornt) {
    case 1:
      tile = reverse(trans(tile));
      break;
    case 2:
      tile = invert(reverse(tile));
      break;
    case 3:
      tile = invert(trans(tile));
      break;
    case 4:
      tile = reverse(tile);
      break;
    case 5:
      tile = reverse(invert(trans(tile)));
      break;
    case 6:
      tile = invert(tile);
      break;
    case 7:
      tile = trans(tile);
      break;
    default:
      break;
  }
  return tile;
};

const removeBorder = function (tile) {
  tile = tile.slice(1, tile.length - 1);
  tile = tile.map((val) => val.substring(1, val.length - 1));
  return tile;
};

const tileNum = 8;
let tileMerge = [];
for (let i = 0; i < rowNum; i++) {
  for (let j = 0; j < colNum; j++) {
    let temp = tileMap1.get(tileOrder[i][j]);
    let tileValue = removeBorder(changeOrnt(temp.tileVal, temp.ornt));
    if (j === 0) {
      tileValue.forEach((val, k) => {
        tileMerge[i * tileNum + k] = val;
      });
    } else {
      tileValue.forEach((val, k) => {
        tileMerge[i * tileNum + k] += val;
      });
    }
  }
}

const countHash = function (tile) {
  let cnt = 0;
  tile.forEach((val) => {
    cnt += val.split("").filter((val1) => val1 === "#").length;
  });
  return cnt;
};
const orignialHash = countHash(tileMerge);

const tileMergeRow = tileMerge.length;
let monsCount = 0;
let itrPos = 0;
let origTileMerge = tileMerge.map((val) => val);
while (monsCount === 0 && itrPos < 8) {
  tileMerge = origTileMerge.map((val) => val);
  tileMerge = changeOrnt(tileMerge, itrPos);

  let tileMergePattern = [];
  tileMerge.forEach((val, i) => {
    let temp = "";
    if (i < tileMergeRow - 2) {
      val.split("").forEach((val1, j) => {
        temp += val1;
        temp += tileMerge[i + 1].charAt(j);
        temp += tileMerge[i + 2].charAt(j);
        // console.log("a", j, tileMerge[i + 1], tileMerge[i + 1].charAt(j));
      });
      tileMergePattern[i] = temp;
    }
  });

  const upd =
    /(.)#(.)(.)(.)#(.)(.)(.)(.)(.)(.)(.)(.)#(.)#(.)(.)#(.)(.)(.)#(.)(.)(.)(.)(.)(.)(.)(.)#(.)#(.)(.)#(.)(.)(.)#(.)(.)(.)(.)(.)(.)(.)(.)#(.)#(.)##(.)(.)#/g;
  const rep =
    "$1M$2$3$4O$5$6$7$8$9$10$11$12O$13O$14$15O$16$17$18O$19$20$21$22$23$24$25$26O$27O$28$29O$30$31$32O$33$34$35$36$37$38$39$40O$41O$42OO$43$44O";

  const aftUpd = tileMergePattern.map((val) => val.replaceAll(upd, rep));

  aftUpd.forEach((val) => {
    val.split("").forEach((val1, i) => {
      if (val1 === "M" && i % 3 === 1) monsCount++;
    });
  });
  itrPos++;
}
console.log(orignialHash - monsCount * 15);
