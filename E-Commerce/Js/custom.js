


var preloader = document.getElementById('preloader');
// var postload = document.getElementById('postload');
var classpostload = document.getElementsByClassName('postload')

window.addEventListener('load',()=>{
  let whatsappicon = document.getElementsByClassName('whatsapp-icons')[0]
  for(let postload of classpostload){
          setTimeout(()=>{
            postload.classList.remove('postload')     
            preloader.style.display = 'none';
          },1000)
    }
    setTimeout(()=>{
      whatsappicon.style.opacity = '1'
      whatsappicon.style.bottom = '60px'      
    },1000)
    setTimeout(()=>{
      whatsappicon.style.bottom = '30px'      
    },1500)
})


window.addEventListener('scroll',()=>{
  var header = document.getElementById('header')
  var navcat = document.getElementById('nav-cat')
  // var leftban = document.getElementsByClassName('lefttowban')[0]
  // var rightban = document.getElementsByClassName('righttwoban')[0]
 
  if(this.scrollY > 1){
    header.style.boxShadow = "0 1px 5px #888888";
    if(navcat !== null){
      navcat.style.display = "none"
    }
  }
  else{
    header.style.boxShadow = "";
    if(navcat !== null){
      navcat.style.display = "block"
    }
    
  }

  // if(this.scrollY > 1751.199951171875){
  //   leftban.style.transform = "scale(1)"
  //   leftban.style.opacity = "1"
  //   rightban.style.transform = "scale(1)"
  //   rightban.style.opacity = "1"
    
  // }
  // else{
  //   leftban.style.transform = "scale(.5)"
  //   leftban.style.opacity = "0"
  //   rightban.style.transform = "scale(.5)"
  //   rightban.style.opacity = "0"
  // }
})





