// 记录多循环中的元素数量

const primaryArr = [
  { id: 1, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 2, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 3, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 4, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 5, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 6, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 7, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 8, child: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 9, child: [1, 2, 3, 4, 5, 6, 7, 8] },
];

let number = 0;
primaryArr.map((val) => val.child.map((v) => number++));
console.log(number);
