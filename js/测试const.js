// const 不能直接将一个变量赋值给已定义的变量 
// 可以修改里面的属性或者添加新的属性，因为他们指向的内存地址还是同一个地址

const obj = { key: "测试的", val: "vvval" };
const newObj = { name: "名字", age: 18 };

// obj = newObj;

obj.key = "555";
newObj.sex = "男";
console.log(obj, newObj);
