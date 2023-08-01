// 事件循环 process.nextTick优先于Promise.then方法 都属于微任务
  
// 1.  
// console.log("1");
// setTimeout(function () {
//   console.log("2");
//   new Promise(function (resolve) {
//     console.log("4");
//     resolve();
//   }).then(function () {
//     console.log("5");
//   });
//   process.nextTick(function () {
//     console.log("3");
//   });
// });
// new Promise(function (resolve) {
//   console.log("7");
//   resolve();
// }).then(function () {
//   console.log("8");
// });
// process.nextTick(function () {
//   console.log("6");
// });
// setTimeout(function () {
//   console.log("9");
//   process.nextTick(function () {
//     console.log("10");
//   });
//   new Promise(function (resolve) {
//     console.log("11");
//     resolve();
//   }).then(function () {
//     console.log("12");
//   });
// });

// 2.
// setTimeout(function () {
//   console.log(1);
// }, 0);
// new Promise(function (resolve, reject) {
//   console.log(2);
//   resolve();
// })
//   .then(function () {
//     console.log(3);
//   })
//   .then(function () {
//     console.log(4);
//   });
// process.nextTick(function () {
//   console.log(5);
// });
// console.log(6);

// 3.
setTimeout(function () {
  console.log(1);
}, 0);
new Promise(function (resolve, reject) {
  console.log(2);
  for (var i = 0; i < 10000; i++) {
    if (i === 10) {
      console.log(10);
    }
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function () {
  console.log(4);
});
console.log(5);
