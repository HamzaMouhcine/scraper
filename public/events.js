
console.log("hello my friend");
let cnt=0;
let btn = document.querySelector('button');
btn.addEventListener('click',function(){
	if(cnt==0){
    	$('.post').css('display','none');
    	cnt=1;
    }else {
    	$('.post').css('display','block');
    	cnt=0;
    }

});