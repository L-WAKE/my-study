const fs = require('fs');
const path = require('path');

// readFile方式读取文件
// readFile 函数异步读取文件的全部内容，并存储在内存中，然后再传递给用户。
fs.readFile('./测试文件夹/test.txt', 'utf8', (err, data) => {
    if (err) console.log(err)
    else {
        console.log(`Data present in the file is::    \n${data}`);
    }
});



// createReadStream方式
// 与 readFile 相比，createReadStream 使用更少的内存和更快的速度来优化文件读取操作。
// 如果文件相当大，用户不必等待很长时间直到读取整个内容，因为读取时会先向用户发送小块内容。
const readStream = fs.createReadStream('./测试文件夹/test.txt', { encoding: 'utf8' });

//读取文件发生错误事件
readStream.on('error', (err) => {
    console.log('发生异常:', err);
});

//已打开要读取的文件事件
readStream.on('open', (fd) => {
    console.log('文件已打开:', fd);
});

//文件已经就位，可用于读取事件
readStream.on('ready', () => {
    console.log('文件已准备好..');
});

//文件读取中事件·····
readStream.on('data', (chunk) => {
    console.log('读取文件数据:', chunk);
});

//文件读取完成事件
readStream.on('end', () => {
    console.log('读取已完成..');
});

//文件已关闭事件
readStream.on('close', () => {
    console.log('文件已关闭！');
});
