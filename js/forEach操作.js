// forEach操作.js

/*
    测试forEach的async-await
    在 forEach 中使用 async/await 时，
    异步操作并不会等待前一个操作结束再执行下一个，而是会同时执行多个异步操作
    可以用for 或者for of 替换forEach
*/
// 1.async-await
const testArr = ["WAKE", "UP", "SOME", "BODY", "WIN"];
function asyncFunc(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello" + item);
    }, 1000);
  });
}
async function testForeach(arr) {
  //   arr.forEach(async (item, index) => {
  //     const res = await asyncFunc(item);
  //     console.log("res", res);
  //   });
  for (let item of arr) {
    const res = await asyncFunc(item);
    console.log("res", res); 
  }
}
// testForeach(testArr); 

// 2.跳出循环
function breakForeach(arr) {
  try {
    arr.forEach((item) => {
      if (item === "SOME") {
        throw "break";
      }
      console.log("item", item);
    });
  } catch (e) {
    console.log(e);
  }
}
breakForeach(testArr);
