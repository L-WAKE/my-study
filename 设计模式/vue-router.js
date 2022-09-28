Array.prototype.myForEach=function(fn,thisArgs){
    console.log(this)
    console.log(fn)
    console.log(thisArgs)
}
let arr=[1,2,3]
arr.myForEach((item,index)=>{
    console.log(item)
})