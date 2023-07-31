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
