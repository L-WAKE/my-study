let arr=[-2,-1,3,5,7]
arr.sort((a,b)=>{
    return Math.abs(a-2)-Math.abs(b-2)
})
console.log(arr)