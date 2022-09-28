function debounce(fn,delay){
    var timer=null
    var delay=delay?delay:200
    return function(){
        let args=arguments
        let that=this
        clearTimeout(timer)
        timer=setTimeout(() => {
            fn.apply(that,args)
        }, delay);
    }
}