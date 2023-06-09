// 两个数组求交集

const array = [5, 6, 9, 4, 5, 4, 2];
const arrayOther = [5, 2, 8];

const beMixed = (arr = [], arr2 = []) => {
  const mixedArr = [];
  if (arr.length > arr2.length) {
    [arr, arr2] = [arr2, arr];
  }
  arr.forEach((item) => {
    const find = arr2.find((v) => v == item);
    find && mixedArr.push(find);
  });
  return mixedArr;
};

const mixedArr = beMixed(array, arrayOther);
console.log(mixedArr);

const deleArr = [5, 6, 4, NaN, 1, NaN];
//删除数组中的NAN
function deleteNaN(arr) {
  let resultArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i]) {
      resultArr.push(arr[i]);
    }
  }
  return resultArr;
}
console.log("deleteNaN", deleteNaN(deleArr));
