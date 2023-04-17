const arrData = [
  { name: "zlw1", age: 15 },
  { name: "zlw2", age: "24" },
  { name: "wlz3", age: 25 },
  { name: "wlz4", age: 210 },
  { name: "wlz6", age: "21" },
  { name: "wlz5", age: "18" },
];
const compare = (arr, field) => {
  const setSort = (prop) => {
    return function (obj1, obj2) {
      let val1 = obj1[prop];
      let val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    };
  };
  const newArr = arr.sort(setSort(field));
  return newArr;
};
console.log(compare(arrData, "age"));
