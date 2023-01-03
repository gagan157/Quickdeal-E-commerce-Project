


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

let AllProducts = []
// add to cart function
let itemDiscount = 3.00
let OnlineCardDiscount = 5.35
let TotalAmount = 0.00
let GrandTotal = 0.00

  //featch all prd
  let url = 'https://dummyjson.com/products'
  let fetchproducts = async function(url,limit,skip){
    let responce = await fetch(`${url}/?limit=${limit}&skip=${skip}`,{
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }

    })
    
    let data = await responce.json()
    
    if(data){
      AllProducts.push(...data.products);
      let card = document.getElementsByClassName('prd-group')[0]
      document.getElementById('Product-loader').style.display = 'none'
      document.getElementById('loadmorebtn').style.display = 'block'
      card.innerHTML = ''
    for(let resuldata of AllProducts){
      // console.log(resuldata);
      card.innerHTML += `<div id="allprd-card-${resuldata.id}" class="prd-card">
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
    if(localStorage.getItem('cart') ){
      let dataInfo = new Map(JSON.parse(localStorage.getItem('cart')))
      
      //show notification 
      let cartNotification = document.getElementById('totalNoOfProducts')
      cartNotification.style.display = 'block'
      cartNotification.innerText = dataInfo.size 
      
      //price summary show
      document.getElementById(`cart-footer`).style.display = 'flex'
      document.getElementById('PriceSummary').style.display = 'block'
     
      for(let data of dataInfo){      
        cartinlist(data[0])
        TotalAmount += Number(dataInfo.get(data[0]).price) * Number(dataInfo.get(data[0]).count)

        //hide btn
        document.getElementById(`prd-btn-${data[0]}`).style.display = 'none'
        //show incree and drement btn
        document.getElementById(`prd-btn-addcart-${data[0]}`).style.display = 'flex'
        
        //show count
        document.getElementById(`prd-incti-count-${data[0]}`).innerText = dataInfo.get(data[0]).count
        // document.getElementById(`prd-card-count-${data[0]}`).innerText = dataInfo.get(data[0]).count;
      }
      document.getElementById('TotalAmount').innerHTML = `$${TotalAmount}`
      GrandTotal = TotalAmount - itemDiscount - OnlineCardDiscount
      document.getElementById('GrandTotal').innerHTML = `$${GrandTotal}`
      document.getElementById('OverAllTotal').innerHTML = `$${GrandTotal}`
    }    
    }

  }


  let limitdata = 30;
  let skip = 0 
  fetchproducts(url,limitdata,skip)

  //loadmore data
  let oneTimeskip = 20
  function loadMoreProduct(){
    if(skip < 90){
      limitdata = 10
      skip += oneTimeskip + limitdata
      oneTimeskip = 0 
      document.getElementById('Product-loader').style.display = 'block'
      document.getElementById('loadmorebtn').style.display = 'none'     
      fetchproducts(url,limitdata,skip);
    }
    else{
      document.getElementById('loadmorebtn').style.display = 'none' 
      document.getElementById('Product-loader').style.display = 'none'   
    }
  }


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



// scrolling when click btn
document.getElementById('scrollleftbtn').addEventListener('click',()=>{
  let silder = document.getElementById('prdCAtWise')
  slider.scrollLeft = slider.scrollLeft -= 280;
})
document.getElementById('scrollrightbtn').addEventListener('click',()=>{
  let silder = document.getElementById('prdCAtWise')
  slider.scrollLeft = slider.scrollLeft += 280;
})




//get data categorywise ane by one
async function getdataone(id){
  let response = await fetch(`https://dummyjson.com/products/${id}`)
  let data  = await response.json()
  return data;
}

let cartdataPrd = []
function cartinlist(id){
  let dataInfo = new Map(JSON.parse(localStorage.getItem('cart')))
  let cartlist = document.getElementById('cartlist')
  document.getElementById('emptycart').style.display = 'none'
  cartlist.style.display = 'block';
  // cartlist.innerHTML = `<div class="addcart-prds-title">Order Summary</div>`
  let data = getdataone(id);
  data.then((result)=>{
    cartdataPrd.push(result)
   
      cartlist.innerHTML += `<div id="cart-prd-${result.id}" class="Addcart-prd-card">
      <div class="Addcart-prd-img">
        <img src="${result.thumbnail}" alt="">
      </div>
      <div class="Addcart-prd-body">
        <div class="title">${result.title}</div>
        <div class="price">$${result.price} <span>$599</span> <span>${result.discountPercentage}% off</span></div>
        <div class="btns">
          <button onClick={decrimentprd(this)} id="decri-${result.id}" type="button"><i class="fa-solid fa-minus"></i></button>
          <span id="prd-card-count-${result.id}">${dataInfo.get(`${result.id}`).count}</span>
          <button onClick={incrimentprd(this)} id="incri-${result.id}" type="button"><i class="fa-sharp fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>`
   
  })
}






//click add to cart



function addToCart(e){
 //show notication on cart 
  let cartNotification = document.getElementById('totalNoOfProducts')
  cartNotification.style.display = 'block'

  let prdCard = document.getElementById(`allprd-card-${e.id}`)
  let title = prdCard.children[1].children[0].children[0].innerText
  let catgorey = prdCard.children[1].children[1].innerText
  let rating = prdCard.children[1].children[2].children[5].innerText
  let allprice = prdCard.children[1].children[3].innerText
  let price = allprice.split(' ')[0].split('$')[1]
  let discount = allprice.split(' ')[2].split('%')[0]
  let img = prdCard.children[0].children[0].getAttribute('src')
  let count = 1;

  //add local storage
  // localStorage.setItem("cart", JSON.stringify(Array.from(ProductInfo.entries())))
  if(!localStorage.getItem('cart')){
    let datainfo = new Map()
    datainfo.set(e.id,{'id':e.id,'title':title,'category':catgorey,'rating':rating,'price':price,'discount':discount,'img':img,'count':count})
    localStorage.setItem('cart', JSON.stringify(Array.from(datainfo.entries())))
  }
  else{
    let dataInfo = new Map(JSON.parse(localStorage.getItem('cart')))
    dataInfo.set(e.id,{'id':e.id,'title':title,'category':catgorey,'rating':rating,'price':price,'discount':discount,'img':img,'count':count})    
    localStorage.setItem('cart', JSON.stringify(Array.from(dataInfo.entries())))
  }
  
  let dataInfo = new Map(JSON.parse(localStorage.getItem('cart')))
  cartinlist(e.id);
  cartNotification.innerText = dataInfo.size;
  
  //update prod item
  document.getElementById(`prd-incti-count-${e.id}`).innerText = '1';

  //hide btn
  document.getElementById(`prd-btn-${e.id}`).style.display = 'none'
  //show incree and drement btn
  document.getElementById(`prd-btn-addcart-${e.id}`).style.display = 'flex'
  document.getElementById(`cart-footer`).style.display = 'flex'


  //show total price
  TotalAmount += Number(dataInfo.get(e.id).price)
  document.getElementById('TotalAmount').innerHTML = `$${TotalAmount}`

  //total item dicount 12.00
  GrandTotal = TotalAmount - itemDiscount

  //29.49    5%  online discount
  GrandTotal = GrandTotal - OnlineCardDiscount
  document.getElementById('GrandTotal').innerHTML = `$${GrandTotal}`
  document.getElementById('OverAllTotal').innerHTML = `$${GrandTotal}`

  //show price summary
  document.getElementById('PriceSummary').style.display = 'block'
}

//incriment product items
function incrimentprd(e){
  let id = e.id.split('-')[1]

  if(localStorage.getItem('cart')){
    //get info in localstoragae
    let dataInfo = new Map(JSON.parse(localStorage.getItem('cart')));
    let data = dataInfo.get(id);
    let dataquautity = data.count;
    let convToNum = Number(dataquautity)
    convToNum++;
    data['count'] = convToNum

    localStorage.setItem("cart", JSON.stringify(Array.from(dataInfo.entries())))
    
    document.getElementById(`prd-incti-count-${id}`).innerText = convToNum;
    document.getElementById(`prd-card-count-${id}`).innerText = convToNum;
    TotalAmount += Number(data.price)
    document.getElementById('TotalAmount').innerHTML = `$${TotalAmount}`

    //total item dicount 12.00
    GrandTotal = TotalAmount - itemDiscount

    //29.49    5%  online discount
    GrandTotal = GrandTotal - OnlineCardDiscount
    document.getElementById('GrandTotal').innerHTML = `$${GrandTotal}`
    document.getElementById('OverAllTotal').innerHTML = `$${GrandTotal}`
  }
}
//decriment product item
function decrimentprd(e){
  let id = e.id.split('-')[1]

  let cartNotification = document.getElementById('totalNoOfProducts')
  let dataInfo = new Map(JSON.parse(localStorage.getItem('cart')));
  if(localStorage.getItem('cart')){
    //get info in localstoragae
    let data = dataInfo.get(id);
    let dataquautity = data.count;
    let convToNum = Number(dataquautity)
    convToNum--;
    data['count'] = convToNum
    
    document.getElementById(`prd-incti-count-${id}`).innerText = convToNum;
    document.getElementById(`prd-card-count-${id}`).innerText = convToNum;

    
    TotalAmount -= Number(data.price)
    document.getElementById('TotalAmount').innerHTML = `$${TotalAmount}`

    //total item dicount 12.00
    GrandTotal = TotalAmount - itemDiscount

    //29.49    5%  online discount
    GrandTotal = GrandTotal - OnlineCardDiscount
    document.getElementById('GrandTotal').innerHTML = `$${GrandTotal}`
    document.getElementById('OverAllTotal').innerHTML = `$${GrandTotal}`

    if(convToNum === 0){
      document.getElementById(`prd-btn-${id}`).style.display = 'block'
      document.getElementById(`prd-btn-addcart-${id}`).style.display = 'none'
      document.getElementById(`cart-prd-${id}`).remove();
      dataInfo.delete(id)
      localStorage.setItem("cart", JSON.stringify(Array.from(dataInfo.entries())))
    }
    else{
      localStorage.setItem("cart", JSON.stringify(Array.from(dataInfo.entries())))
    }
    cartNotification.innerText = dataInfo.size    
  }
  
  if(dataInfo.size === 0){
    localStorage.removeItem('cart')
    cartNotification.style.display = 'none'
    document.getElementById('cartlist').style.display = 'none'
    document.getElementById('emptycart').style.display = 'flex'
    document.getElementById(`cart-footer`).style.display = 'none'
    document.getElementById('PriceSummary').style.display = 'none'
    TotalAmount = 0
  }
}