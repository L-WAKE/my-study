// var a='10'
// function test(x){
//     console.log(x)  //var x 被function覆盖
//     var x=3         //console.log(x) 
//     function x(){}  //x=3
//     console.log(x)  //function x(){}
//                     //console.log(x)
// }
// test(20)
// var a = 10;
// a=function(){}
// console.log(a)
//传入test一个变量20 
//在函数中，传入了x，相当于创建了一个变量，x=20
//var x进行i变量提升，但是已经有x这个变量了，所以是进行了一次没有意义的重复宣告，x依旧是20
//所以第一个console打印20
//然后x打印函数

//如果声明的变量已经被赋值，则函数无法覆盖同名变量，如果没有赋值，则函数会覆盖同名变量。
// function a(a){
//     a=a+10
// }
// var a=10
// console.log(a)
// console.log(1+ "2"+"2");//+号除了进行加法运算，还有字符串连接的作用，有字符串就是连接字符串
// console.log(1+ +"2"+"2");//第一个+"2"中的加号是一元加操作符，+"2"会变成数值2，因此1+ +"2"相当于1+2=3.
//                          // 然后和后面的字符串“2”相合并，变成了字符串"32".
// console.log("A"- "B"+"2"); // "A"-"B" Number('A')=Nan 再加上字符串‘2’，所以是‘nan2’
// console.log("A"- "B"+2); 
var x={name:'niaho'}
console.log(x)