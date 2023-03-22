const ReadStream = require("./createReadStream");
const WriteStream = require("./writeStream");

// rs是一个可读流
let rs = new ReadStream("./text.txt", {
  highWaterMark: 4,
});
// ws是一个可写流
let ws = new WriteStream("./copy.txt", {
  start: 0,
  highWaterMark: 1,
});

// pipe是异步的，因为内部用的是发布订阅模式
rs.pipe(ws); // 写在ReadStream中
