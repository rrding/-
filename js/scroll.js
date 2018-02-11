// window.onresize = function(){
//     //cstumScroll('div1','div2','div3','txt');  //收放窗口时触发;
//     cstumScroll('div1','div2','content_r','contntList');
// }

//cstumScroll('div1','div2','div3','txt');

cstumScroll('M_idx_scrBody1','scrlBlock1','content_r','contntList');

//scrollBody：滚动条的整体的id；scrollBlock：滚动滑块的id；divBox:内容显示区域的id，cntList：实际内容的id; wH=window.innerHeight：不传参默认为：window的高度;

function cstumScroll(scrollBody,scrollBlock,divBox,cntList,wH=window.innerHeight){

    const div1 = document.getElementById(scrollBody);
    const div2 = document.getElementById(scrollBlock);
    const div3 = document.getElementById(divBox);
    var txt = document.getElementById(cntList);

    div1.style.height= div3.style.height = wH + 'px';
    div2H = div1.offsetHeight*div3.offsetHeight/txt.scrollHeight;
    div2.style.height = div2H + 'px';
    if(div2H < 20){
        div2.style.height = '20px';
    }else{
        div2.style.height = div2H + 'px';
    }
    div2.onmousedown = div3.onmousedown= function(ev){
        let disY = ev.pageY - div2.offsetTop;

        document.onmousemove = function(ev){
            let t = ev.pageY - disY;

            if(t < 0){
                t = 0;
            }else if(t > div1.clientHeight - div2.clientHeight){
                t = div1.clientHeight - div2.clientHeight;
            }

            /*
                核心就是这个比例
            */
            let scale = t /  (div1.clientHeight - div2.clientHeight);
            
            txt.style.top =  scale *  (div3.offsetHeight - txt.scrollHeight) + 'px';
            div2.style.top = t + 'px';
        }
        document.onmouseup = function(){
            document.onmousemove = document.onmouseup = null;
        }
        return false;
    }

    addWheel(div1,function(o){
        let t = div2.offsetTop;
        if(o){
            t -= 5;
        }else{
            t += 5;
        }

        if(t < 0){
            t = 0;
        }else if(t > div1.clientHeight - div2.clientHeight){
            t = div1.clientHeight - div2.clientHeight;
        }

        let scale = t /  (div1.clientHeight - div2.clientHeight);
            
        txt.style.top =  scale *  (div3.offsetHeight - txt.scrollHeight) + 'px';
        
        div2.style.top = t + 'px';
    });

    //页面滚轮
    addWheel(div1,function(o){
        let t = div2.offsetTop;
        if(o){
            t -= 5;
        }else{
            t += 5;
        }

        if(t < 0){
            t = 0;
        }else if(t > div1.clientHeight - div2.clientHeight){
            t = div1.clientHeight - div2.clientHeight;
        }

        let scale = t /  (div1.clientHeight - div2.clientHeight);
            
        txt.style.top =  scale *  (div3.offsetHeight - txt.scrollHeight) + 'px';


        div2.style.top = t + 'px';
    });

    
    // addWheel(div3,function(o){
    //     let t = txt.offsetTop;
    //     if(o){
    //         t += 5;
            
    //     }else{
    //         t -= 5;
            
    //     }

    //     if(t > 0){
    //         t = 0;
    //     }

    //     let scale = t /  (div1.clientHeight - div2.clientHeight);

    //     txt.style.top =  scale *  (div1.offsetHeight - div2.scrollHeight) + 'px';

    //     txt.style.top = t + 'px';
    //     div2.style.top = - scale *  (div1.offsetHeight - div2.scrollHeight) + 'px';
    // });


    function addWheel(obj,fn){
        obj.addEventListener('mousewheel',callback);
        obj.addEventListener('DOMMouseScroll',callback);

        function callback(ev){
            let o = true; //向上
            if(ev.wheelDelta){
                o = ev.wheelDelta > 0?true:false;
            }else{
                o = ev.detail < 0? true:false;
            }
            fn && fn(o);
            ev.preventDefault();
        }
    }
}