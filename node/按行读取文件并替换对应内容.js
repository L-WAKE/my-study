const fs = require('fs');
const path = require('path');


// 以行的方式读取目录下的所有文件 并且逐行定制化替换文件
// 替换  this.$message.error(_this.$t('i18n889'));
// 为    this.$message({showClose: true,message: _this.$t('i18n889'), type: 'error' });
const readAllFile = (url, cb) => {
    const filePath = path.resolve(url);
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, (err, files) => {
        if (err) return console.error('Error:(spec)', err)
        cb(files)
    });
}
var lines = ""
readAllFile('./测试文件夹/source', (files) => {
    console.log('files', files)
    files.forEach(file => {
        lines = ""
        const allFileContents = fs.readFileSync('./测试文件夹/source/' + file, 'utf-8');
        allFileContents.split(/\r?\n/).forEach(line => {
            setStr(line)
        });
        const opt = {
            flag: 'w', // a：追加写入；w：覆盖写入
        }
        fs.writeFile('./测试文件夹/output/' + file, lines, opt, function (err) {
            if (err) {
                return console.log('文件写入失败' + err.message)
            } else {
                console.log('文件写入成功!')
            }
        })
    });
})
const writeLine = (line) => {
    lines = lines ? lines + '\n' + line : line
}
const setStr = (line) => {
    let replaceArr = ['error', 'success', 'warning', 'info']
    let str = replaceArr.find(v => line.indexOf(v) != -1) || ''
    let iof = '$message.' + str
    let addi = 10 + str.length
    if (line.indexOf(iof) != -1 && str) {
        let sidx = line.indexOf(iof)
        let lstr = line.substring(0, sidx)
        let lastk = line.lastIndexOf(')')
        let msg = line.substring(sidx + addi, lastk)
        let cstr = `$message({showClose: true,message: ${msg}, type: '${str}' });`
        console.log(lstr + cstr)
        writeLine(lstr + cstr)
        return
    }
    writeLine(line)
}