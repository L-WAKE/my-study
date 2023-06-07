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
