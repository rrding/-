// const Ranking=document.getElementById('Ranking');
// const tv = document.getElementById('tv');
function newFileMove(c){
	
	//详情页iframed
	newFileShow(newFileData(data))
	const ifra = document.getElementById('ifra');
	const contentR = document.getElementById('content_r');
	const contentL = document.querySelector('.content_l');
	const singerLst = document.querySelector('.singerLst');
	const x_close = document.getElementById('x_close');
	const docHtmlSize = parseFloat(getComputedStyle(docHtml).fontSize);

	ifra.style.display = 'none';
	ifra.style.position = 'absolute';
	ifra.style.width = contentR.clientWidth/docHtmlSize+ 'rem';

	
	ifra.style.top = 0;
	let timer = null;
	let num = 0;
	c?chu():hui();
	function chu (){
		ifra.style.display = 'block';
		let rights = -ifra.clientWidth
		ifra.style.right = rights/100 + 'rem';
		timer = setInterval(function () {
			num ++;
			if(rights >= 0){
				clearInterval(timer)
				pageChange = true
				ifra.style.right = '0px'
				
			}else {
				rights = -contentR.clientWidth + num*30
				ifra.style.right = rights/100 + 'rem';
			}
		},10)
		x_close.onclick = function(){
			ifra.style.display = 'none';
			M_idx_scrBody.style.display = 'none';
		}
		M_idx_scrBody.style.display = 'block';
		cstumScroll('M_idx_scrBody','scrlBlock','ifra','M_dtl_box');


	}

	function hui(){
		
		if(ifra.style.right =='0px'){
			ifra.style.display = 'block';
			let rights = 0;
			timer = setInterval(function () {
				num ++;
				if(rights<=-contentR.clientWidth){
					clearInterval(timer);
					ifra.style.right=-contentR.clientWidth/100+'rem';
					
				}else{
					rights = -num*30 
					ifra.style.right=rights/100 + 'rem';
				}
			},10)
		}
		
		
	}			
}





let noSingr = null;

function newFileData(data){
	let arr = []
	let arr2 = []
	arr = location.hash.slice(1,location.hash.length).split('=')[1].split('/')
	
	if(arr[0] ==='singer'){		
		data.forEach((e,i)=>{
			if(e[arr[0]].first===arr[1]){
				arr2.push(e)
			}
		})
		noSingr = null;
	}else {
		if(arr[1]==='siqi' || arr[1] ==='rege'){
			for(let i=0;i<12;i++){
				arr2.push(data[i])
			}
		}else{
			let arr3 = [];
			for(var i=0;i<9;i++){
				let a = (Math.round(Math.random()*139));
				arr3.some(e=>e===a)?null:arr3.push(a);	
			}
			arr3.forEach(e=>{
				data.forEach(e2=>{
					if(e==e2.id){
						arr2.push(e2)	
					}
				})
			})
		}
		if(arr[0]==='broadCast'){
			noSingr = {}
			Object.assign(noSingr,menu.filter(e=>e.id===arr[1]))
		}else{
			noSingr = {}
			Object.assign(noSingr,list.filter(e=>e.id===arr[1]))
		}
	}
	return arr2
}

		




function newFileShow(arr){
	let uls = document.getElementsByClassName('M_dtl_tion_ul')[0];
	let str=''
	let onOff = true;
	str +=`<div class="M_dtl_nav">
								<div class="M_dtl_num"></div>
								<div class="M_dtl_the"><span>歌曲</span></div>					
								<div class="M_dtl_name"><span>歌手</span></div>
								<div class="M_dtl_Album"><span>专辑</span></div>
								<div class="M_dtl_often"><span>时长</span></div>
							</div>	`
	arr.forEach(function(e,i){	
		str += `
		<li>
		<div class="M_dtl_num">${i+1}</div>						
		<div class="M_dtl_the"><span class = "spans">${e.song}
		</span><i class="fa fa-play" style = "display:none;"></i></div>					
		<div class="M_dtl_name"><span>${e.singer.name}</span></div>
		<div class="M_dtl_Album"><span>${e.album}</span></div>
		<div class="M_dtl_often"><span>${e.time}</span></div>
		</li>
		`
	})
	uls.innerHTML=str;
	//const ifra = document.getElementById('ifra');
	const lis = uls.getElementsByTagName('li');
	const is = document.getElementsByTagName('i');
	let h2 = document.getElementById('M_dtl_head_right').children[0];
	let h3 = document.getElementById('M_dtl_head_right').children[1];
	let imgs = document.getElementById('M_dtl_head_left_1').children[0];
	let likeimg = document.getElementsByClassName('M_dtl_imgs')[0].children;
	let bqian = document.getElementsByClassName('M_dtl_ul')[0].children[0].children[1];
	let bfang = document.getElementsByClassName('M_dtl_ul')[0].children[1].children[1];
	let scang = document.getElementsByClassName('M_dtl_ul')[0].children[2].children[1];
	//let M_dtl_bc = document.getElementById('M_dtl_bc');
	let M_dtl_text = document.getElementById('M_dtl_text');
	var pd = {}
	
	if(noSingr){
		pd.name = noSingr[0].name;
		pd.img = noSingr[0].img;
		pd.intro = noSingr[0].intro?noSingr[0].intro:'';
		pd.tap = noSingr[0].tap?noSingr[0].tap:noSingr[0].name;
		pd.Rtro = noSingr[0].Rtro?noSingr[0].Rtro:'';
	}else{
		pd.name = arr[0].singer.name;
		pd.img = arr[0].singer.photo;
		pd.intro = arr[0].singer.intro;
		pd.tap = arr[0].singer.tap;
	}
	inData()

	function inData (){
		pd.Rtro?M_dtl_text.firstElementChild.innerText=pd.Rtro:null;
		imgs.src = pd.img;
		h2.innerText = pd.name;
		h3.innerText = pd.intro;
		bqian.innerText = pd.tap;
		bfang.innerText = Math.round(Math.random()*10000+30000);
		scang.innerText = Math.round(Math.random()*5000+15000);
		//ifra.style.backgroundImage = 'url('+pd.img+')';
		M_dtl_bc.style.backgroundImage = 'url('+pd.img+')';
	}
	

	for(let i = 0;i<likeimg.length;i++){
		// likeimg[i].style.width = '104px';
		// likeimg[i].style.height = '100px';
		let a = (Math.round(Math.random()*139));
		likeimg[i].src = data[a].singer.photo;
	}
	

	//一入一出
	for(let i=0; i<lis.length; i++){
		lis[i].onmouseover = function(){
			is[i].style.display = 'block';
		}
		lis[i].onmouseout = function(){
			is[i].style.display = 'none';
		}
		lis[i].onclick = function(){
			window.open('Music/index.html#'+arr[i].id,'play');
		}
	}
	const bf  = document.querySelector('.M_dtl_bf')
	const fen = document.querySelector('.M_dtl_fen')
	const tcc = document.querySelector('.M_dtl_tcc')
	const pup = document.querySelector('.M_dtl_pup')
	const spans = bf.querySelector('span');
	const img = bf.querySelector('img');
	fen.onclick=function(){	
		tcc.style.display = 'block';		
	}
	pup.onclick=function(){
		tcc.style.display = 'none';
	}
	//点击更换播放按钮图片
	bf.onclick = function(){
		if(onOff){
			// bf.style.background = '#ac996f';
			// spans.style.color = '#000';
			// img.src = './img/222222.png'
			playData (arr)
		}else{
			// bf.style.background = '';
			// spans.style.color = '#ac996f';
			// img.src = './img/111111.png'
			
		}
		onOff=!onOff
	}
}

function playData(){
	window.open('Music/index.html#o','play');
}
