const fs = require("fs");
let sourceFile = require("./sourceFile");
const handObj = {};
let enKeys = Object.keys(sourceFile);
enKeys.forEach((item, index) => {
  const keys = {};
  for (let key in sourceFile[item]) {
    const newKey = `--${key}`;
    const value = sourceFile[item][key];
    keys[newKey] = value;
  }
  handObj[item] = keys;
});
fs.writeFileSync("./transObj.json", JSON.stringify(handObj), "utf-8");
console.log(handObj);
