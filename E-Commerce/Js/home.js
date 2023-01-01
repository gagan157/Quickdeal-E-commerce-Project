


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 6,
    spaceBetween: 30,
    slidesPerGroup: 6,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  //featch all prd
  let url = 'https://dummyjson.com/products'
  let fetchproducts = async function(url){
    let responce = await fetch(url,{
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }

    })
    let data = await responce.json()
    // console.log(data.products)
    return data.products;
  }
  let data = fetchproducts(url);
  Promise.all([data]).then((result)=>{
    // console.log(result[0])
    let card = document.getElementsByClassName('prd-group')[0]
    for(let resuldata of result[0]){
      // console.log(resuldata);
      card.innerHTML += `<div class="prd-card">
      <div class="prd-img">
        <img src="${resuldata.thumbnail}">
      </div>
      <div class="prd-body">
        <div class="prd-titles">
          <div class="prd-title truncate-title">${resuldata.title}</div>
          <div class="prd-heart-logo"><i class="fa-regular fa-heart"></i></div>
        </div>
        <div class="prd-cat">${resuldata.category}</div>
        <div class="prd-rating-start">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span> <span>(${resuldata.rating})</span>
        </div>
        <div class="prd-price">
          $${resuldata.price} <span>$20</span> <span>${resuldata.discountPercentage}% off</span> 
        </div>
      </div>
      <div id="prd-btn-${resuldata.id}" class="prd-btn">
        <button onClick={addToCart(this)} id="${resuldata.id}" type="button">Add to cart</button>
      </div>
      <div id="prd-btn-addcart-${resuldata.id}" class="prd-btn-addcart">
        <button onClick={decrimentprd(this)} id="decri-${resuldata.id}" class="decriment"><i class="fa-solid fa-minus"></i></button>
        <span id="prd-incti-count-${resuldata.id}">0</span>
        <button onClick={incrimentprd(this)} id="incri-${resuldata.id}" class="inciment"><i class="fa-sharp fa-solid fa-plus"></i></button>
      </div>
    </div>`
    }
  })


//fech data one category
async function fetchOneCategoryData(){
  let response = await fetch('https://dummyjson.com/products/category/mens-watches')
  let data = await response.json();
  // console.log(data)
  if(response){
    document.getElementsByClassName('catageryWisePrd-loader')[0].style.display = "none"
  }  
  Show(data.products);  
}  
function Show(data){

  let divcatwiseprd = document.getElementsByClassName('catageryWisePrd')[0]
  for(let da of data){
    divcatwiseprd.innerHTML += `<div class="catwise-card">
    <div class="catwise-card-img">
    <img src="${da.thumbnail}" alt="">
    </div>
    <div class="catwise-card-body">
    <div class="price">$${da.price} <span>$5.24</span></div>
    <div class="name truncate-title">${da.title}</div>
    <div class="Rating-star">
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span> <span>(${da.rating})</span>
    </div>
    <div class="categey">
    ${da.category}
    </div>
    </div>
    <div class="catwise-card-button">
    <button type="button">Buy Now</button>
    </div>
    </div>`
  }

}
//add all fetch data in div
window.addEventListener('load',fetchOneCategoryData);




//click btn then fetch category wsie data
function getdata(e){
  let text = document.getElementById(`${e.id}`).innerText;
  document.getElementById('select-cat-dropdown-chengename').innerText = text;
  

  let categoryWiseUrl = `https://dummyjson.com/products/category/${e.id}`
 
  let divcatwiseprd = document.getElementsByClassName('catageryWisePrd')[0]
  divcatwiseprd.innerHTML = ` <div class="catageryWisePrd-loader"><img src="./Img/loadrer/Spinner.gif" alt=""></div>`;
  let data = categoryWisedata(categoryWiseUrl)
  Promise.all([data]).then((result)=>{
    console.log(result)
    divcatwiseprd.innerHTML = ""; 
      if(result[0].length > 5){
        //show
        // document.getElementById('scrollrightbtn').style.display = 'block'
        // document.getElementById('scrollleftbtn').style.display = 'block'
      }
      else{
        //hide
        // document.getElementById('scrollrightbtn').style.display = 'none'
        // document.getElementById('scrollleftbtn').style.display = 'none'
      }
    
    
      result[0].forEach(element => {
        divcatwiseprd.innerHTML += `<div class="catwise-card">
        <div class="catwise-card-img">
          <img src="${element.thumbnail}" alt="">
        </div>
        <div class="catwise-card-body">
          <div class="price">$${element.price} <span>$5.24</span></div>
          <div class="name truncate-title">${element.title}</div>
          <div class="Rating-star">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span> <span>(${element.rating})</span>
          </div>
          <div class="categey">
            ${element.category}
          </div>
        </div>
        <div class="catwise-card-button">
          <button type="button">Buy Now</button>
        </div>
      </div>`
      });
    
    
  })
}
//fetch api according to catagery
async function categoryWisedata(url){
  let response = await fetch(url);
  let data = await response.json()
  return data.products;  
}






//scrolling ....drag
const slider = document.querySelector('.catageryWisePrd');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; 
  slider.scrollLeft = scrollLeft - walk;

});



//scrolling when click btn
// document.getElementById('scrollleftbtn').addEventListener('click',()=>{
//   let silder = document.getElementById('prdCAtWise')
//   slider.scrollLeft = slider.scrollLeft -= 280;
// })
// document.getElementById('scrollrightbtn').addEventListener('click',()=>{
//   let silder = document.getElementById('prdCAtWise')
//   slider.scrollLeft = slider.scrollLeft += 280;
// })



// add to cart function
let productCartInfo = new Map();

//get data ane by ane
async function getdataone(id){
  let response = await fetch(`https://dummyjson.com/products/${id}`)
  let data  = await response.json()
  return data;
}

function cartinlist(id){
  let cartlist = document.getElementById('cartlist')
  document.getElementById('emptycart').style.display = 'none'
  cartlist.style.display = 'block';
  cartlist.innerHTML = `<div class="addcart-prds-title">Order Summary</div>`
  let data = getdataone(id);
  data.then((result)=>{
    let cartdataPrd = []
    cartdataPrd.push(result)
    console.log(cartdataPrd)
  })
}

function addToCart(e){
 //show notication on cart 
  let cartNotification = document.getElementById('totalNoOfProducts')
  cartNotification.style.display = 'block'
  //save in map
  productCartInfo.set(e.id,1);
  // cartinlist(e.id);
  cartNotification.innerText = productCartInfo.size;
  
  //update prod item
  document.getElementById(`prd-incti-count-${e.id}`).innerText = '1';

  //hide btn
  document.getElementById(`prd-btn-${e.id}`).style.display = 'none'
  //show incree and drement btn
  document.getElementById(`prd-btn-addcart-${e.id}`).style.display = 'flex'

}

//incriment product items
function incrimentprd(e){
  let id = e.id.split('-')[1]

  if(productCartInfo.has(id)){
    let noOfprice = productCartInfo.get(id)
    let converintoNumber = Number(noOfprice)
    converintoNumber++
    productCartInfo.set(id,converintoNumber)
    // cartNotification.innerText = Totalprd;

    document.getElementById(`prd-incti-count-${id}`).innerText = converintoNumber;
  }
}
//decriment product item
function decrimentprd(e){
  let id = e.id.split('-')[1]

  let cartNotification = document.getElementById('totalNoOfProducts')
  if(productCartInfo.has(id)){
    let noOfprice = productCartInfo.get(id)
    let converintoNumber = Number(noOfprice)
    converintoNumber--
  
    if(converintoNumber === 0){
      document.getElementById(`prd-btn-${id}`).style.display = 'block'
      document.getElementById(`prd-btn-addcart-${id}`).style.display = 'none'
      productCartInfo.delete(id)
    }
    else{
      productCartInfo.set(id,converintoNumber)
    }
    cartNotification.innerText = productCartInfo.size

    document.getElementById(`prd-incti-count-${id}`).innerText = converintoNumber;
  }
  
  if(productCartInfo.size === 0){
    cartNotification.style.display = 'none'
    document.getElementById('cartlist').style.display = 'none'
    document.getElementById('emptycart').style.display = 'flex'
  }
}