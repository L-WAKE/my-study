// 模拟微任务宏任务 事件循环
// 1.
// async function async1() {
//     console.log('1');
//     await async2();
//     new Promise(function (resolve) {
//         console.log('9')
//         resolve();
//     }).then(function () {
//         console.log('10')
//     })
//     console.log('2');
// }
// async function async2() {
//     console.log('3');
// }
// console.log('4');
// setTimeout(function () {
//     console.log('5');
// }, 0)
// async1();
// new Promise(function (resolve) {
//     console.log('6');
//     resolve();
// }).then(function () {
//     console.log('7');
// });
// console.log('8');

// 2.
// async function async1() {
//     console.log("1");
//     await async2();
//     console.log("2")
//     new Promise(function (resolve) {
//         console.log("3");
//         resolve()
//     }).then(function () {
//         console.log("4")
//     });
//     console.log('5')
// }
// async function async2() {
//     new Promise(function (resolve) {
//         console.log("12");
//         resolve()
//     }).then(function () {
//         console.log("13")
//     });
//     console.log("6")
// }
// console.log("7");
// setTimeout(function () {
//     console.log("8")
// }, 0);
// async1();
// new Promise(function (resolve) {
//     console.log("9");
//     resolve()
// }).then(function () {
//     console.log("10")
// });
// console.log("11");

// 3.
console.log("1");
setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});
process.nextTick(function () {
  console.log("6");
});
new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});
