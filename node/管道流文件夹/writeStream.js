let fs = require("fs");
let data = "我是从数据库获取的数据，我要保存起来\n";

// 创建一个可以写入的流，写入到文件 output.txt 中
let writerStream = fs.createWriteStream("output.txt");
for (let i = 0; i < 100; i++) {
  writerStream.write(data + i, "utf8");
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
