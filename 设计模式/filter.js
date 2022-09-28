function fn(item,index,arr){
    return item>3
}
Array.prototype.myFilter=function(fn){
    if(!fn.length){
        return 
    }
    let context=this
    let res=[]
    for(let i=0;i<context.length;i++){
        if(fn.call(context,context[i],i,context)){
            res.push(context[i])
        }
    }
    return res
}
let arr=[1,2,3,4,5,6]
console.log(arr.myFilter(fn))