// 如何安全的获取undefined

const test = undefined;
let other;

console.log(typeof test === "undefined");
console.log(other === undefined);
console.log(test === undefined);
console.log(test === void 0);
