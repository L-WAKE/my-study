
let lineIndex = 1
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Read.txt')
});

let lines = ''
lineReader.on('line', function (line) {
  lineIndex++
  isChinese(line)
  if (transTContentOut(line) == false) {
    if (transTContentIn(line) == false) {
      writeLine(line)
    }
  }

});

function isChinese(line) {
  let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
  if (reg.test(line) && line.indexOf('//') == -1 && line.indexOf('<!--') == -1) {
    console.log(lineIndex + '   ' + line);
  } else {
  }
}

// message: {`${this.$t('i18n396')} 1 到 100 个字符`},
// message: `${this.$t('i18n396')} 1 到 100 个字符`,
function transTContentOut(line) {
  if (line.indexOf('{`') != -1) {
    let leftIndex = line.indexOf('${this.$t(')
    let rightIndex = line.indexOf('`}', leftIndex) + 1
    if (leftIndex != -1 && rightIndex != -1 && line.substring(leftIndex, rightIndex) != "") {
      let leftCIndex = line.substring(0, leftIndex).lastIndexOf('{')
      let leftStr = line.substring(0, leftCIndex) + line.substring(leftCIndex + 1, leftIndex)
      let tline = line.substring(leftIndex, rightIndex)
      let rightline = line.substring(rightIndex, line.length)
      tline = leftStr + tline + rightline.substring(1)
      writeLine(tline)
      return true
    }
    return false
  }
  return false
}
//  {this.$t('i18n638')},
//替换大括号
function transTContentIn(line) {
  if (line.indexOf('{`') == -1 && line.indexOf('(`') == -1 && line.indexOf('{this.$t(') != -1) {
    let leftIndex = line.indexOf('{this.$t(')
    let rightIndex = line.indexOf('}', leftIndex) + 1
    if (leftIndex != -1 && rightIndex != -1 && line.substring(leftIndex, rightIndex) != "") {
      let tline = line.substring(leftIndex + 1, rightIndex - 1)
      let leftline = line.substring(0, leftIndex)
      let rightline = line.substring(rightIndex, line.length)
      let rline = leftline + tline + rightline
      writeLine(rline)
      return true
    }
    return false
  }
  return false
}


//1.导入fs文件系统模块
const fs = require('fs')
const opt = {
  flag: 'w', // a：追加写入；w：覆盖写入
}

fs.writeFile('./result.txt', '', opt, function (err) {
  //2.1 如果文件写入成功，则err的值等于null
  //2.2 如果文件写入失败，则err的值等于一个错误对象
  // console.log(err)

  if (err) {
    return console.log('文件写入失败' + err.message)
  } else {
    // console.log('文件写入成功!')
  }
})


function writeLine(line) {
  lines = lines + '\n' + line
}

setTimeout(() => {
  //1.导入fs文件系统模块
  const fs = require('fs')
  const opt = {
    flag: 'a', // a：追加写入；w：覆盖写入
  }


  //2.调用fs.writeFile()写入文件的内容
  //参数1：表示文件的存放路径
  //参数2：表示要写入的内容
  //参数3：回调函数
  fs.writeFile('./result.txt', lines, opt, function (err) {
    //2.1 如果文件写入成功，则err的值等于null
    //2.2 如果文件写入失败，则err的值等于一个错误对象
    // console.log(err)

    if (err) {
      return console.log('文件写入失败' + err.message)
    } else {
      // console.log('文件写入成功!')
    }
  })

}, 2000)
