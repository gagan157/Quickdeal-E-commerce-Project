


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


  let url = 'https://fakestoreapi.com/products'
  let fetchproducts = async function(url){
    let responce = await fetch(url)
    let data = await responce.json()
    return data;
  }
  let data = fetchproducts(url);
  Promise.all([data]).then((result)=>{
    let card = document.getElementsByClassName('prd-group')[0]
    for(let resuldata of result[0]){
      // console.log(resuldata);
      card.innerHTML += `<div class="prd-card">
      <div class="prd-img">
        <img src="${resuldata.image}">
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
          <span class="fa fa-star"></span> <span>(${resuldata.rating.rate})</span>
        </div>
        <div class="prd-price">
          $${resuldata.price} <span>$20</span> <span>12% off</span> 
        </div>
      </div>
      <div class="prd-btn">
        <button type="button">Add to cart</button>
      </div>
    </div>`
    }
  })


//fech data one category
async function fetchOneCategoryData(){
  let response = await fetch('https://fakestoreapi.com/products/category/electronics')
  let data = await response.json();

  if(response){
    document.getElementsByClassName('catageryWisePrd-loader')[0].style.display = "none"
  }  
  Show(data);  
}  
function Show(data){

  let divcatwiseprd = document.getElementsByClassName('catageryWisePrd')[0]
  for(let da of data){
    divcatwiseprd.innerHTML += `<div class="catwise-card">
    <div class="catwise-card-img">
    <img src="${da.image}" alt="">
    </div>
    <div class="catwise-card-body">
    <div class="price">$${da.price} <span>$5.24</span></div>
    <div class="name truncate-title">${da.title}</div>
    <div class="Rating-star">
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span> <span>(${da.rating.rate})</span>
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
  let categoryWiseUrl = `https://fakestoreapi.com/products/category/${e.id}`
 
  let divcatwiseprd = document.getElementsByClassName('catageryWisePrd')[0]
  divcatwiseprd.innerHTML = ` <div class="catageryWisePrd-loader"><img src="../Img/loadrer/Spinner.gif" alt=""></div>`;
  let data = categoryWisedata(categoryWiseUrl)
  Promise.all([data]).then((result)=>{
    divcatwiseprd.innerHTML = ""; 
    result[0].forEach(element => {
      divcatwiseprd.innerHTML += `<div class="catwise-card">
      <div class="catwise-card-img">
        <img src="${element.image}" alt="">
      </div>
      <div class="catwise-card-body">
        <div class="price">$${element.price} <span>$5.24</span></div>
        <div class="name truncate-title">${element.title}</div>
        <div class="Rating-star">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span> <span>(${element.rating.rate})</span>
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
  return data;  
}
