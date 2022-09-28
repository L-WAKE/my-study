// function fn(item,index,arr){
//     return {
//         name:item.name+'  new',
//         age:'年龄:'+index
//     }
// }
// Array.prototype.myMap=function(fn){
//     if(!fn.length){
//         return 
//     }
//     let context=this
//     let res=[]
//     for(let i=0;i<context.length;i++){
//         res.push(fn.call(context,context[i],i,context))
//     }
//     return res
// }
// let arr=[{name:'pgh1'},{name:'pgh2'},{name:'pgh3'},{name:'pgh4'},{name:'pgh5'},{name:'pgh6'}]
// console.log(arr.myMap(fn))
let set=new Set([1,2,3,4,4])
let arr=Array.from(set)
console.log(arr)
set.forEach(item=>{
    console.log(item)
})
let map=new Map()
map.set('name','pgh')
map.set('age',20)
console.log(map.size)
console.log(map)