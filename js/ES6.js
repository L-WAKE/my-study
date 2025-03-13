//1. Object.is()
console.log(+0 === -0); //true
console.log(Object.is(+0, -0)); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

//2. 属性的遍历 
/*
    首先遍历所有数值键，按照数值升序排列
    其次遍历所有字符串键，按照加入时间升序排列
    最后遍历所有 Symbol 键，按照加入时间升序排
*/
let obj = { [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 };
for (let key in obj) {
  console.log("for..in", key);
}
console.log("Object.keys", Object.keys(obj));
console.log("Object.getOwnPropertyNames", Object.getOwnPropertyNames(obj));
console.log("Object.getOwnPropertySymbols", Object.getOwnPropertySymbols(obj));
console.log("Reflect.ownKeys", Reflect.ownKeys(obj));

// 3.Object.fromEntries(),用于将一个键值对数组转为对象
let fromEntries = Object.fromEntries([
  ["foo", "bar"],
  ["baz", 42],
]);
console.log("fromEntries", fromEntries); // { foo: "bar", baz: 42 }




