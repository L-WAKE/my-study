// 判断两个数组是否完全相等

const scalarArrayEquals = (array1, array2) => {
  return (
    array1.length == array2.length &&
    array1.every(function (v, i) {
      return v === array2[i];
    })
  );
};

const arr1 = ["t1", 22];
const arr2 = ["t1", 22];
console.log(scalarArrayEquals(arr1, arr2));
