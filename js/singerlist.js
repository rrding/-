
//首页默认显示歌手全部列表;
//showSingerList(0);
singerShow(0)
idxMenu();
//var sortFlag = true;
//function btnsortFn(){
//  const btn_sort = document.getElementById('btn_sort');
//  const btn_sort_po = document.getElementById('btn_sort_po');
//  console.log(btn_sort);
//
//  btn_sort.onclick = function(){
//      if(sortFlag){
//          showSortSingerList(0);
//      }else{
//          showSortSingerList()
//      }
//      sortFlag = !sortFlag;
//  }
//}
//左侧歌手菜单点击

function idxMenu(){
    const idx_menu = document.querySelector('.M_idx_menu');
    const idx_menu_lis = idx_menu.querySelectorAll('li');
    let M_idx_menu = document.getElementsByClassName('M_idx_menu')[0];
    let logo = document.getElementById('logo');
    const singerMenu = idx_menu_lis[0];
    const tvMenu = idx_menu_lis[1];
    const rankMenu = idx_menu_lis[2];
    const songlistMenu = idx_menu_lis[3];
    let onmove = document.getElementsByClassName('M_idx_audioPlayer')[0];

    idx_menu_lis[0].onclick = function(){
        ifra.style.display = 'none';
        M_idx_scrBody.style.display = 'none';
        //调用滚动条
        scroll()
    }
    idx_menu_lis[0].onmouseover = function(){
        
        const singerChildMu = singerMenu.querySelectorAll('p');
        for(var i=0; i<singerChildMu.length; i++){
            singerChildMu[i].onclick = function(){
                const singerType = this.getAttribute('singer');
                singerShow(singerType);
                contntList.style.height = contntList.scrollHeight +'px';
                ifra.style.display = 'none';
                M_idx_scrBody.style.display = 'none';
            }
        }
    }

    idx_menu_lis[1].onclick = function(){
        broadCast();
        discOut();
        ifra.style.display = 'none';
        M_idx_scrBody.style.display = 'none';
        //调用滚动条
        scroll()
        //隐藏滚动条
        const scrBody = document.getElementById('M_idx_scrBody1');
        scrBody.style.display = 'none';
    }

    idx_menu_lis[2].onclick = function(){
        rankingBand();
        discOut(); 
        ifra.style.display = 'none';
        M_idx_scrBody.style.display = 'none';
        //调用滚动条
        scroll()
        //隐藏滚动条
        const scrBody = document.getElementById('M_idx_scrBody1');
        scrBody.style.display = 'none';
    }
    
    idx_menu_lis[3].onclick = function(){
        //location.hash = 'like';
        //newFileMove(1
        window.open('Music/index.html#o','play');
        //调用滚动条
        scroll()
    }

    logo.onclick=M_idx_menu.firstElementChild.onclick = function(ev){
       
 
        newFileMove(0)
        
    }
}

 
 //这里拿到数据type是左侧list筛选好的数组；
function singerShow (type){
    
    //渲染数组
    //排序后渲染数组
    //点击是渲染好的每一项可以改变hash
    
    showSingerList(type)
    
    //1渲染数组；
    function showSingerList(type,sf){
        var tempArr = getSingerWithType(type);
//      var arr = tempArr; //排序过的结果;
        var arr = [];
        var sg = 'singer'
        if(!sf){
            arr = tempArr
        }else{
            //因为只有两种排序方案所以简写了，再添加方案在这里添加
            arr=sf==='a'?getSortSinge(tempArr):getSortSinge(tempArr).reverse();
        }
      
//      var arr = getSortSinge(tempArr); //排序过的结果;
//      var arr = getSortSinge(tempArr).reverse();
        var singerContent = '<div class="M_idx_singers"><ul class="singerLst clearfix">';
        for(var i=0;i<arr.length;i++){
            var obj = arr[i];
            singerContent += `<li hash="${obj.singer.first}"><a href="javascript:;">
                    <img src="${obj.singer.photo}" />
                    <span>${obj.singer.name}</span>
                </a>
            </li>`;
        }
        singerContent += `</ul>
                          <a href="javascript:;" id="btn_sort">A | Z点我排序</a>
                        </div>`;
    
        contntList.innerHTML = singerContent;
        //调用渲染数组后的排序按钮
        btnsortFn();
        //调用点击li渲染哈希方法
        dataDetail(sg);
        //调用滚动条
        scroll()
    }
    //排序的方法
    function getSortSinge(array){
        return array.sort(function(a,b){
            var value1 = a.singer.first.charCodeAt(0);
            var value2 = b.singer.first.charCodeAt(0);
            return value1 - value2;
        });
    }  
    var sortFlag = true;
    function btnsortFn(){
        const btn_sort = document.getElementById('btn_sort');
        const btn_sort_po = document.getElementById('btn_sort_po');
//      console.log(btn_sort);
    
        btn_sort.onclick = function(){
//          console.log(1)
            var sf = null;
            
            if(sortFlag){
                sf = 'a';
                showSingerList(type,sf);
            }else{
                sf = 'b';
                showSingerList(type,sf)
            }
            sortFlag = !sortFlag;
        }
    }
       
    
}




function getSingerWithType(type) {
    let arr = [];
    data.forEach((e,i)=>{
        arr.push(e);

    });
    //歌手名字去重
    for(let i = 0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
            if(arr[i].singer.name == arr[j].singer.name){
                arr.splice(j,1);
                j--;
            }
        }
    }

    //判断类型
    if(type == 0){  //全部歌手
        // all
       
    }else if(type == 1){ //男
        // nv
        var i=0;
        do{
            var obj = arr[i];
            if(obj.singer.sex != "m"){
                arr.splice(i,1);
            }else{
                i++;
            }
        }while(i<arr.length)
    }else if(type == 2){  //女
        // nan
        var i=0;
        do{
            var obj = arr[i];
            if(obj.singer.sex != "w"){
                arr.splice(i,1);
            }else{
                i++;
            }
        }while(i<arr.length)
    }else if(type == 3){ //组合
        // zuhe
        var i=0;
        do{
            var obj = arr[i];
            if(obj.singer.sex != "n"){
                arr.splice(i,1);
            }else{
                i++;
            }
        }while(i<arr.length)
    }else if(type == 4){ //组合
        // zuhe
        var i=0;
        do{
            var obj = arr[i];
            if(obj.singer.tap != "华语"){
                arr.splice(i,1);
            }else{
                i++;
            }
        }while(i<arr.length)
    }else if(type == 5){ //组合
        // zuhe
        var i=0;
        do{
            var obj = arr[i];
            if(obj.singer.tap != "欧美"){
                arr.splice(i,1);
            }else{
                i++;
            }
        }while(i<arr.length)
    }
    return arr;
}


//按人名排序
//function getSortSinge(array){
//  return array.sort(function(a,b){
//      var value1 = a.singer.first.charCodeAt(0);
//      var value2 = b.singer.first.charCodeAt(0);
//      return value1 - value2;
//  });
//}

//显示数据
//function showSingerList(type,cl){
//  var tempArr = getSingerWithType(type);
//  var arr = tempArr; //排序过的结果;
//  var singerContent = '<div class="M_idx_singers" style="display: block;"><ul class="singerLst clearfix">';
//  for(var i=0;i<arr.length;i++){
//      var obj = arr[i];
//      singerContent += `<li singername="${obj.singer.first}"><a href="javascript:;">
//              <img src="${obj.singer.photo}" />
//              <span>${obj.singer.name}</span>
//          </a>
//      </li>`;
//  }
//  singerContent += `</ul>
//                    <a href="javascript:;" id="btn_sort">A | Z点我排序</a>
//                  </div>`;
//
//  contntList.innerHTML = singerContent;
//  dataDetail();
//  btnsortFn();
//}



//显示歌手排序过的数据
//function showSortSingerList(type){
//  var tempArr = getSingerWithType(type);
//  var arr = getSortSinge(tempArr); //排序过的结果;
//  var singerContent = '<div class="M_idx_singers" style="display: block;"><ul class="singerLst clearfix">';
//  for(var i=0;i<arr.length;i++){
//      var obj = arr[i];
//      singerContent += `<li singername="${obj.singer.first}"><a href="#">
//              <img src="${obj.singer.photo}" />
//              <span>${obj.singer.name}</span>
//          </a>
//      </li>`;
//  }
//  singerContent += `</ul>
//                    <a href="javascript:;" id="btn_sort">A | Z点我排序</a>
//              </div>`;
//
//  contntList.innerHTML = singerContent;
//  
//  btnsortFn();
//  dataDetail();
//}


//显示歌手反向排序过的数据
//function showSortSingerListRvs(type){
//  var tempArr = getSingerWithType(type);
//  var arr = getSortSinge(tempArr).reverse(); //排序过的结果;
//  var singerContent = '<div class="M_idx_singers" style="display: block;"><ul class="singerLst clearfix">';
//  for(var i=0;i<arr.length;i++){
//      var obj = arr[i];
//      singerContent += `<li singername="${obj.singer.first}"><a href="#">
//              <img src="${obj.singer.photo}" />
//              <span>${obj.singer.name}</span>
//          </a>
//      </li>`;
//  }
//  singerContent += `</ul>
//                    <a href="javascript:;" id="btn_sort">Z | A点我排序</a>
//              </div>`;
//
//  contntList.innerHTML = singerContent;
//  btnsortFn();
//  dataDetail();
//}


//显示电台的数据
function broadCast(){
    var dt = 'broadCast'
    //content_r.innerHTML='';
    contntList.innerHTML = '';
    let div =document.createElement('div');     
        div.className='M_idx_imgList';
    let ul=document.createElement('ul');
        ul.className='box_ul';
        div.appendChild(ul);    
        contntList.appendChild(div);
        //content_r.appendChild(contntList);  


    for(let i=0;i<list.length;i++){
        
        ul.innerHTML += `<li hash="${menu[i].id}">
                            <div class="imgBox">
                                <div class="move"></div>
                                <a href="javascript:;" class="dicsImg">
                                    <img src="${menu[i].img}" class="disc"/>
                                    <span class="m-name">${menu[i].name}</span>
                                </a>
                            </div>
                        </li>`;
    }
    dataDetail(dt);
    //隐藏滚动条
    const scrBody = document.getElementById('M_idx_scrBody1');
    scrBody.style.display = 'none';
}


//显示排行榜的数据
function rankingBand(){
    var rb = 'rankingBand'
    //content_r.innerHTML='';
    contntList.innerHTML = '';
    let div =document.createElement('div');     
        div.className='M_idx_imgList';
    let ul=document.createElement('ul');
        ul.className='box_ul';
        div.appendChild(ul);    
        contntList.appendChild(div);
        //content_r.appendChild(contntList);          
    for(let i=0;i<list.length;i++){
        ul.innerHTML+= `<li hash="${list[i].id}">
                            <div class="imgBox">
                                <div class="move"></div>
                                <a href="javascript:;" class="dicsImg">
                                    <img src="${list[i].img}" class="disc"/>
                                    <span class="m-name">${list[i].name}</span>
                                </a>
                            </div>
                        </li>`;
    }
    dataDetail(rb);
}

function scroll() {
    const contntList = document.getElementById('contntList');
    const scrollObj = contntList.querySelector('ul');
    const scrBody = document.getElementById('M_idx_scrBody1');
    if(scrollObj.scrollHeight < window.innerHeight){
        scrBody.style.display = 'none';
    }else{
        scrBody.style.display = 'block';
    }
}



