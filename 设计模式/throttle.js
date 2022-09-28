function throttle(fn,delay){
    let delay=delay?delay:200
    let lastTime=0
    return function(){
        let args=arguments
        let that=this
        let nowTime=new Date().getTime()
        if(nowTime-lastTime>delay){
            fn.apply(that,arguments)
            lastTime=nowTime
        }
    }
}