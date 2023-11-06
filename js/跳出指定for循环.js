// 跳出指定for循环 
 
for (let i = 0; i < 5; i++) {
  console.log("iiii=", i);
  outerLoop: for (let j = 0; j < 4; j++) {
    console.log("j = " + j);
    if (i === 2) {
      break outerLoop;
    }
  }
}

// 在下面的例子中，我们使用了两个嵌套的for循环。当j等于3且i等于2时，我们使用break loop1;语句跳出了外层循环，即带有标签loop1的循环。
// 这样，当条件满足时，程序会直接跳出外层循环，不再继续执行后续的迭代。请确保标签的命名唯一，并且正确地放置break语句。

loop1: for (var i = 0; i < 5; i++) {
  console.log("外层循环：" + i);
  loop2: for (var j = 0; j < 5; j++) {
    if (j === 3 && i === 2) {
      break loop1; // 跳出外层循环
    }
    console.log("内层循环：" + j);
  }
}
