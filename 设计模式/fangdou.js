function debounce(fn,delay){
    var delay=delay||200
    let timer=null
    return function(){
        var args=arguments
        var that=this
        console.log(args)
        console.log(that)
        clearTimeout(timer)
        timer=setTimeout(() => {
            fn.apply(that,args)
        }, delay);
    }
}
let param='pgh'
let res=debounce(()=>{
    console.log(param+'你好')
},100)
res(param)