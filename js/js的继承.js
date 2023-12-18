/*
    https://blog.csdn.net/m0_63153901/article/details/125247615
    原型链继承:通过实例化一个函数使子类的原型指向父类的实例，子类就可以调用到父类的属性和方法
    优点：1.写法方便简洁、容易理解；
    缺点：1.原型对象的引用属性是所有实例共享的, 2.创建子类实例时，无法向父类构造函数传参
*/
// 继承 
console.log(
  "=============================原型链继承================================"
);

// 创建要继承的父类 
function FatherPrototype() {
  // 自带的属性和方法
  this.name = "li";
  this.show = function () {
    console.log("show方法帅");
  };
}
// 定义Son
function SonPrototype() {}
// 令Son继承Father
SonPrototype.prototype = new FatherPrototype(); // 这句是原型链继承的重点
// 创建Son的对象实例
const sonprototype = new SonPrototype();
const sonprototype1 = new SonPrototype();
sonprototype.__proto__.name = "zhang"; //通过一个实例改变Son的prototype上的name
console.log("sonprototype.name", sonprototype.name); // 可以调用继承于父类上的属性

console.log(
  "===========================构造函数继承==================================="
);
/*
    构造函数继承：在子类型的构造函数中调用超类型的构造函数。
    优点：1.解决了引用类型的值被实例共享的问题，2.可以向超类传递参数
    缺点：1.不能继承超类原型上的属性和方法，2.原型链丢失
*/
function ParentCall(name) {
  this.name = name;
  this.hobbies = ["sing", "dance", "rap"];
}
function ChildCall(name) {
  ParentCall.call(this, name);
  this.age = 24;
}
const c1Call = new ChildCall("c1Call");
const c2Call = new ChildCall("c2Call");
c1Call.hobbies.push("coding");
console.log(c1Call.hobbies);
console.log(c2Call.hobbies);
console.log(c1Call instanceof ParentCall);
console.log(c1Call instanceof ChildCall);

console.log(  
  "============================组合模式继承=================================="
);
/*
    组合模式继承:组合式继承是将原型链继承和构造函数继承二者取其长处组合到一起而产生的继承模式。
    优点：1.即通过在原型上定义方法实现了函数复用，又保证每个实例都有自己的属性，2.解决了原型链继承和借用构造函数继承造成的影响。
    缺点：1.导致无论在什么情况下都会调用两次超类型构造函数： 一次是在创建子类型原型的时候；一次是在子类型构造函数的内部。
*/
function ParentCommon(name) {
  this.name = name;
  this.hobbies = ["sing", "dance", "rap"];
}
ParentCommon.prototype.getName = function () {
  return this.name;
};
function ChildCommon(name) {
  ParentCommon.call(this, name);
  this.age = 24;
}
ChildCommon.prototype = new ParentCommon("父类");
const c1Common = new ChildCommon("c1");
const c2Common = new ChildCommon("c2");
console.log(c1Common.hasOwnProperty("name")); // true
console.log(c1Common.getName()); // "c1"
c1Common.hobbies.push("coding");
console.log(c1Common.hobbies); // ["sing", "dance", "rap", "coding"]
console.log(c2Common.hobbies); // ["sing", "dance", "rap"]

console.log(
  "============================寄生式继承=================================="
);  
/*
      寄生式继承:它结合原型式继承和工厂模式，创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象。
      优点：1.写法简单，不需要单独创建函数。
      缺点：1.通过该方式给对象添加函数会导致函数难以复用。
*/
function createAnother(origin) {
  const clone = Object.create(origin); // 通过调用函数创建一个新对象
  clone.sayHi = function () {
    // 以某种方式来增强这个对象
    console.log("Hi");
  };
  return clone; // 返回这个对象
}

const o1Paras = {
  name: "父对象",
  hobbies: ["sing", "dance", "rap"],
};
const o2Paras = createAnother(o1Paras);
o2Paras.sayHi();

console.log(
  "============================ES6——class继承=================================="
);
/*
        ES6——class继承:先将父类实例对象上的方法和属性，加到this上面（所以必须调用super（）方法），然后再用子类的构造函数修改this。
        需要注意的是：class关键字只是原型的语法糖，js继承依然是基于原型实现的。
        优点：1.语法简单易懂，操作更加方便
        缺点：1.不是每个浏览器都支持class关键字
*/
class ParentEs6 {
  constructor(name) {
    this.name = name;
    this.hobbies = ["sing", "dance", "rap"];
  }
  getHobbies() {
    return this.hobbies;
  }
  static getCurrent() {
    console.log(this);
  }
}
class ChildEs6 extends ParentEs6 {
  constructor(name) {
    super(name);
  }
}
const c1Es6 = new ChildEs6("c1Es6");
const c2Es6 = new ChildEs6("c2Es6");
console.log(c1Es6 instanceof ChildEs6); // true
console.log(c2Es6 instanceof ParentEs6); // true
