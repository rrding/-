


//获取页面上数据 ，点击后传hash;
function dataDetail(lx){
    const content_r = document.getElementsByClassName('content_r')[0];
    const idx_singers = content_r.getElementsByTagName('li');
	for(let i =0;i<idx_singers.length;i++){
		idx_singers[i].onclick = function(){
            window.location.hash = 'hs='+lx+'/'+this.getAttribute('hash');
            newFileMove(1);
		}
	}
    
}
// hash

let pageChange = true;
window.onhashchange=function(){
    
    let h = location.hash.split('=')[0];
    if(pageChange){
        pageChange = false;
       
    }
}




//shaxuan
function foll (obj){
    var arr = [];
    if(obj.id){
        arr = data.filter(e=>{
            return e.id === obj.id;
        })
    }else if(obj.name){
        arr = data.filter(e=>{
            return e.name === obj.name;
        })
    }else if(obj.singerName){
        arr = data.filter(e=>{
            return e.singer.name === obj.singerName;
        })
    }else if(obj.singerSex){
        arr = data.filter(e=>{
            return e.singer.sex === obj.singerSex;
        })
    }else if(obj.album){
        arr = data.filter(e=>{
            return e.album === obj.album;
        })
    }
    return arr ;
}

//

    function logeClick(){
        loading.hash = '=';
    }