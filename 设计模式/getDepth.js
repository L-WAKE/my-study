function getDepth(arr){
    let res=1
    function fn(arr){
        let tempArr=[]
        let arrLength=tempArr.length
        for(let i=0;i<arr.length;i++){
            if(typeof arr[i]=='object'){
                for(let j=0;j<arr[i].length;j++){
                    tempArr.push(arr[i][j])
                }
            } 
        }
        if(tempArr.length>arrLength){
            res++
            arrLength=tempArr.length
            return fn(tempArr)
        }else{
            return res
        }
    }
    return fn(arr)
}
let arr=[1,2,[3],[4,5,[6]]]
console.log(getDepth(arr))