$(function(){
    //1.监听点击规则时候的事件
    $(".rules").click(function(){
        $(".rule").stop().fadeIn(100);  //点击规则的时候淡入显示
    })
    //2.监听点击关闭时候的事件
    $(".close").click(function(){
        $(".rule").stop().fadeOut(100); //点击关闭时候将规则隐藏
    })
    //3.监听点击开始时候的事件
    $(".start").click(function(){
        $(".start").fadeOut(100);    //隐藏开始游戏按钮
        diao();           //调用进度条的方法
        hui();            //调用灰太狼的方法
    })
    //4.监听从新开始按钮
    $(".cx").click(function(){
        $(".mask").fadeOut(100);   //关闭从新开始页面
        diao();
        hui();
        $(".fen").text(0);
    })
    //5.监听点击返回主页面的方法
    $(".fh").click(function(){
        $(".mask").fadeOut(100);
        $(".start").fadeIn(100);
        $(".jindu").css("width","180");
        $(".fen").text(0);
    })

    var wftime;
    //定义处理灰太狼的方法
    function hui(){
            //1.1定义两个数组保存灰太狼和小灰灰的图片
            var dad=['./images/h0.png','./images/h1.png','./images/h2.png',
            './images/h3.png','./images/h4.png','./images/h5.png',
            './images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
            var son=['./images/x0.png','./images/x1.png','./images/x2.png',
            './images/x3.png','./images/x4.png','./images/x5.png',
            './images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
            //1.2定义一个数组保存所有可能出现的位置
            var api=[
                {left:"100px",top:"115px"},
                {left:"20px",top:"160px"},
                {left:"190px",top:"142px"},
                {left:"105px",top:"193px"},
                {left:"19px",top:"221px"},
                {left:"202px",top:"212px"},
                {left:"120px",top:"275px"},
                {left:"30px",top:"295px"},
                {left:"209px",top:"297px"}
            ];
            //1.3创建一个图片
            var tu=$("<img src='' class='wfimg'>");
            //1.4随机获取一个0-8的数字 图片的位置 0<=index<1 之间的一个随机数。
            var index=parseInt(Math.random()*9);
            //1.5设置它显示的位置
            tu.css({
                position:"absolute",
                left:api[index].left,
                top:api[index].top
            });
            //1.6随机获取一个数组名字 根据下标
            var index2=parseInt(Math.random()*2)==0?dad:son;
            //1.7设置图片的内容 全局变量
            window.x=0;
            window.end=5;
        wftime=setInterval(function(){
            if(x>end){
                tu.remove();
                clearInterval(wftime);
                hui();
            }
            tu.attr("src",index2[x]);
            x++;
        },120);
            //1.8添加到界面上
            $(".container").append(tu);
            //1.9调用处理游戏规则的方法
            game(tu);

    }
    //实现游戏规则方法
    function game(tu){
        tu.one("click",function(){
            window.x=5;            //修改拍打后的图片的索引
            window.end=9;

            //拿到当前点击图片的地址
            var a =$(this).attr("src");
            //根据图片地址判断是否是灰太狼
            var flag=a.indexOf("h")>=0;
            if(flag){
                var a=parseInt($(".fen").text())+10;
                if(a==50){
                    alert("WOW!!灰太狼杀手！！！");
                }
                $(".fen").text(a);
            }else{
                var b=parseInt($(".fen").text())-10;
                if(b==-30){
                    alert("游戏结束！！你的得分："+b);
                    stoptim();
                    $(".start").fadeIn(100);
                    stophui();
                    $(".fen").text(0);
                }else{
                    $(".fen").text(b);
                }
            }
        })
    }
    //停止进度条动画，将进度条恢复函数
    function stoptim(){
        $(".jindu").css("width","180");
        clearInterval(tim);
    }

    //停止动画函数
    function stophui(){
        $(".wfimg").remove();
        clearInterval(wftime);
    }
    //定义进度条方法
    function diao(){
        $(".jindu").css("width","180"); //为从新开始设置的
        //开启定时器处理进度条
        tim=setInterval(function(){
            var w=$(".jindu").width();   //拿到当前进度条的宽度 -1
            w -= 1;
            $(".jindu").css("width",w);  //给进度宽度从新赋值
            if(w<=0){                   //判断进度条是否走完 走完即关闭定时器
                clearInterval(tim);
                $(".mask").stop().fadeIn(100);  //显示从新开始页面
                stophui();          //停止灰太狼的动画
                var c=parseInt($(".fen").text());
                alert("游戏结束！！你的得分："+c);
            }
        },100)
    }
    
})