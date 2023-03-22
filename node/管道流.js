//writeStream.js
var fs = require("fs");
var data = "我是从数据库获取的数据，我要保存起来11\n";

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream("output.txt");
for (var i = 0; i < 100; i++) {
  writerStream.write(data, "utf8");
}

//标记写入完成
writerStream.end();

writerStream.on("finish", function () {
  console.log("写入完成");
});

//失败
writerStream.on("error", function () {
  console.log("写入失败");
});

var fs = require("fs");
// 创建一个可读流
var readerStream = fs.createReadStream("input.txt");

// 创建一个可写流
var writerStream = fs.createWriteStream("output.txt");

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");
