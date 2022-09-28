function throttle(fn,delay){
    var lastTime
    var timer
    var delay=delay||200
    return function(){
        var nowTime=Date.now()
        if(lastTime&&nowTime-lastTime<delay){
            clearTimeout(timer)
            timer=setTimeout(() => {
                lastTime=nowTime
                fn.apply(this,args)
            }, delay);
        }else{
            lastTime=nowTime
            fn.apply(this,args)
        }   
    }
}