function fn(num) {
  return new Promise((resolve, reject) => {
    resolve(console.log(num));
  });
}

// generator 写法
function* testGen() {
  fn(1);
  yield;
  fn(2);
  yield;
  fn(3);
}
let f = testGen();
f.next();
f.next();
f.next();
// 1 2 3

// async/await 写法  
async function test() {
  let a = await fn(1);
  let b = await fn(2);
  let c = await fn(3);
}
test(); // 1 2 3

// 将async函数把testGen里的*替换成 async，
// 将 yield 替换成 await，所以async/await是generator的语法糖
