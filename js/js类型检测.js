/*
    1、typeof 检测一些基本的数据类型
    语法：typeof 后面加不加括号都是可以用的
    注意：正则、{}、[]、null输出结果为object
*/
console.log("==================typeof=============================");
console.log(typeof /\d/); //object
console.log(typeof {}); //object
console.log(typeof []); //object
console.log(typeof null); //object
console.log(typeof 123); //number
console.log(typeof true); //boolean
console.log(typeof function () {}); //function
console.log(typeof undefined); //undefined

/*
    2、A  instanceof   B检测当前实例是否隶属于某个类
    双目运算符 a instanceof b ,判断a的构造器是否为b，返回值为布尔值
*/
console.log("==================instanceof=============================");
function bIns() {}
let aIns = new bIns();
console.log(aIns instanceof bIns); //true
console.log(bIns instanceof Object); //true
let arrIns = [1, 2, 3, 4];
console.log(arrIns instanceof Array); //true

/*
    3、constructor构造函数
    实例.constructor对象的原型链下（构造函数的原型下）有一个属性，叫constructor
*/
console.log("==================constructor=============================");
function bCon() {}
let aContr = new bCon();
console.log(aContr.constructor.name); //bCon
console.log(aContr.constructor); //Function（）{}
console.log(Function.constructor); //Function（）{}

/*
    4、hasOwnporperty 检测当前属性是否为对象的私有属性
    语法: obj.hasOwnporperty(“属性名（K值）”)
*/
console.log("==================hasOwnporperty=============================");
let objHas = {
  name: "lxw",
};
console.log(objHas.hasOwnProperty("name")); //true
console.log(objHas.hasOwnProperty("lxw")); //false

/*
    5、Object.portotype.toString （最好的）
    语法: Object.prototype.toString.call([value])
*/
console.log("==================toString=============================");
Object.prototype.toString.call(12); //[boject Number]
Object.prototype.toString.call(true); //[boject Boolean]
