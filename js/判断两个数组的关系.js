// 判断两个数组是否完全相等
const scalarArrayEquals = (array1, array2) => {
  return (
    array1.length == array2.length &&
    array1.every(function (v, i) {
      return v === array2[i];
    })
  );
};
const sarr1 = ["t1"];
const sarr2 = ["t1", 22];
console.log("scalarArrayEquals", scalarArrayEquals(sarr1, sarr2));

// 判断一个数组是否包含另一个数组
const getInclude = (arr1, arr2) => {
  let temp = [];
  let notTmp = [];
  for (const item of arr1) {
    arr2.find((i) => i === item) ? temp.push(item) : notTmp.push(item);
  }
  return notTmp.length > 0 ? false : true;
};
const garr1 = ["2", "3"];
const garr2 = ["3"];
console.log("getInclude", getInclude(garr1, garr2));

// 判断一个数组中是否含有另一个数组中的某一个元素 arr1中找arr2
const findElement = (arr1, arr2) => {
  let findArr = [];
  for (let item of arr1) {
    arr2.find((i) => i === item) ? findArr.push(item) : "";
  }
  return findArr.length > 0 ? true : false;
};
const farr1 = ["2", "3", "44"];
const farr2 = ["44"];
console.log("findElement", findElement(farr1, farr2));

/*
  every方法的使用
  every()方法用于检测数组中的所有元素是否都满足指定条件（该条件为一个函数）。
  every()方法会遍历数组的每一项，如果有有一项不满足条件，则表达式返回false,
  剩余的项将不会再执行检测；如果遍历完数组后，每一项都符合条，则返回true。
*/
const earr = [200, 120, 600, 50];
const flag = earr.every(function (v, i) {
  return v > 20;
});
console.log("flag", flag);

/*
  some方法的使用
  如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
  如果没有满足条件的元素，则返回false。
*/
const earr1 = [200, 120, 600, 50];
const sFlag = earr1.some((item) => item == 50);
console.log("some", sFlag);
