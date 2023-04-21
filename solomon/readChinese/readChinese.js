let lineIndex = 1;
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("Read.txt"),
});

lineReader.on("line", function (line) {
  lineIndex++;
  isChinese(line);
});

function isChinese(line) {
  let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (
    reg.test(line) &&
    line.indexOf("//") == -1 &&
    line.indexOf("<!--") == -1
  ) {
    console.log(lineIndex + "   " + line);
  } else {
  }
}
