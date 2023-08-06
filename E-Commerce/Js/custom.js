
var preloader = document.getElementById('preloader');
// var postload = document.getElementById('postload');
var classpostload = document.getElementsByClassName('postload')

window.addEventListener('load',()=>{
  let whatsappicon = document.getElementsByClassName('whatsapp-icons')[0]
  for(let postload of classpostload){
      if(postload && preloader){
        setTimeout(()=>{
          postload.classList.remove('postload')     
          preloader.style.display = 'none';
        },1000)
      }
    }
    setTimeout(()=>{
      whatsappicon.style.opacity = '1'
      whatsappicon.style.bottom = '60px'      
    },1000)
    setTimeout(()=>{
      whatsappicon.style.bottom = '30px'      
    },1500)
})






//whats app link
function sendtoWhatsApp(){
  console.log("working whats app")
    window.open('https://wa.me/8368620076','_blank')
}

//signup
function openSignup(){
  clearForm('signup-inp')
  let signupDiv = document.getElementById('SIGNUP_PART')
  let signinDiv = document.getElementById('SIGNIN_PART')

  signinDiv.style.display = 'none'
  signupDiv.style.display = 'flex'
}
//signin
function openSignin(){
  clearForm('log-inp')
  let signupDiv = document.getElementById('SIGNUP_PART')
  let signinDiv = document.getElementById('SIGNIN_PART')

  signinDiv.style.display = 'flex'
  signupDiv.style.display = 'none'
}

function disableAllWhenCreateAccount(bool,{part,btn,googlebtn}){
  let signupDiv = document.getElementById(part)
  let signupbtn = document.getElementById(btn)
  let signupgooglebtn = document.getElementById(googlebtn)
  if(bool){
    signupDiv.style.cursor = "progress"
    signupbtn.style.cursor = "progress"
    signupbtn.setAttribute('disabled',true)
    signupgooglebtn.style.cursor = "progress"
    signupgooglebtn.setAttribute('disabled',true)
  }
  else{
    signupDiv.style.cursor = "default"
    signupbtn.style.cursor = "pointer"
    signupbtn.removeAttribute('disabled')
    signupgooglebtn.style.cursor = "pointer"
    signupgooglebtn.removeAttribute('disabled')
  }
}
function clearForm(clsname){
  let inps = document.querySelectorAll(`.${clsname}`)
  for(let inp of inps){
    inp.value = ""
  }
}

//userSignup
function userSignup(e){
  e.preventDefault();
  // console.log(e.target)
  let signupIds = {
    part : "SIGNUP_PART",
    btn : "signup-btn",
    googlebtn : "signup-google-btn"
  }
  disableAllWhenCreateAccount(true,signupIds)
  let errorDiv = document.getElementById('signup-error')
  let formdata = new FormData(e.target)
  let userSignupData = {}
  for (let [key, value] of formdata) {
    key = key.split('-')[1]
    userSignupData[key] = value
  }
  firebase.auth().createUserWithEmailAndPassword(userSignupData.email, userSignupData.password)
  .then((userCredential) => {
    // Signed up
    var user = userCredential.user;
    user.updateProfile({
      displayName: userSignupData.name,
    })
    console.log(user)
    errorDiv.style.display = 'none'
    errorDiv.innerText = ''
    disableAllWhenCreateAccount(false,signupIds)
    clearForm("signup-inp")
    openSignin()
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    errorDiv.style.display = 'unset'
    errorDiv.innerText = `*${errorMessage}`
    disableAllWhenCreateAccount(false,signupIds)
  });
}

//signin With Google
function signinWithGoogle(){
  let signupIds = {
    part : "SIGNUP_PART",
    btn : "signup-btn",
    googlebtn : "signup-google-btn"
  }
  let signinIds = {
    part : "SIGNIN_PART",
    btn : "Login-btn",
    googlebtn : "Login-google-btn"
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = 'it';
  disableAllWhenCreateAccount(true,signupIds)
  disableAllWhenCreateAccount(true,signinIds)
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    window.location.href = '../home.html'
    disableAllWhenCreateAccount(false,signupIds)
  disableAllWhenCreateAccount(false,signinIds)
  }).catch((error) => {   
    var errorCode = error.code;
    var errorMessage = error.message;   
    var email = error.email;    
    var credential = error.credential;
    disableAllWhenCreateAccount(false,signupIds)
  disableAllWhenCreateAccount(false,signinIds)
  });
  
}

//login
function userLogin(e){
  e.preventDefault();
  let signupIds = {
    part : "SIGNIN_PART",
    btn : "Login-btn",
    googlebtn : "Login-google-btn"
  }
  disableAllWhenCreateAccount(true,signupIds)
  let errorDiv = document.getElementById('login-error')
  let formdata = new FormData(e.target)
  let logindata = {}
  for(let [key,val] of formdata){
    key = key.split('-')[1]
    logindata[key] = val
  }
  //singin fun
  firebase.auth().signInWithEmailAndPassword(logindata.email, logindata.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // console.log(user)
    errorDiv.style.display = 'none'
    errorDiv.innerText = ``
    disableAllWhenCreateAccount(false,signupIds)
    clearForm("log-inp")
    window.location.href = '/home.html'
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    errorDiv.style.display = 'unset'
    errorDiv.innerText = `Email or Password Not Correct`
    disableAllWhenCreateAccount(false,signupIds)
  });

}

function userLogout(){
  firebase.auth().signOut().then(() => {
    window.location.href = "../home.html"
  }).catch((error) => {
    // An error happened.
  });
}

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

let itemDiscount = 3.00
let OnlineCardDiscount = 5.35
let TotalAmount = 0.00
let GrandTotal = 0.00
let Gst = 5.00

if(localStorage.getItem('cart')){
  let CartItem = JSON.parse(localStorage.getItem('cart'))
  let cartCount = document.getElementById('totalNoOfProducts')
  cartCount.innerText = CartItem.length
  cartCount.style.display = 'block'
  document.getElementById(`cart-footer`).style.display = 'flex'
  document.getElementById('PriceSummary').style.display = 'block'
  
  for(let [key,val] of CartItem){
    // console.log(val)
    cartinlist(key)
    TotalAmount += Number(val.price) * Number(val.count)
          
    //hide btn
    let maincardbtn = document.getElementById(`prd-btn-${key}`)
    if(maincardbtn){
      maincardbtn.style.display = 'none'
    }
    //show incree and drement btn
    let prdcartbtn = document.getElementById(`prd-btn-addcart-${key}`)
    if(prdcartbtn){
      prdcartbtn.style.display = 'flex'
    }
    
    //show count
    // document.getElementById(`prd-incti-count-${key}`).innerText = dataInfo.get(data[0]).count
  }
      document.getElementById('TotalAmount').innerHTML = `$${TotalAmount}`
      GrandTotal = TotalAmount - itemDiscount - OnlineCardDiscount
      GrandTotal = (GrandTotal*Gst)/100;
      document.getElementById('GrandTotal').innerHTML = `$${GrandTotal}`
      document.getElementById('OverAllTotal').innerHTML = `$${GrandTotal}`
}
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
    
    let maincard = document.getElementById(`prd-incti-count-${id}`)
    if(maincard){
      maincard.innerText = convToNum;
    }
    document.getElementById(`prd-card-count-${id}`).innerText = convToNum;
    TotalAmount += Number(data.price)
    document.getElementById('TotalAmount').innerHTML = `$${TotalAmount}`

    //total item dicount 12.00
    GrandTotal = TotalAmount - itemDiscount

    //29.49    5%  online discount
    GrandTotal = GrandTotal - OnlineCardDiscount
    GrandTotal = (GrandTotal*Gst)/100;
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
    
    let maincard = document.getElementById(`prd-incti-count-${id}`)
    if(maincard){
      maincard.innerText = convToNum;
    }
    document.getElementById(`prd-card-count-${id}`).innerText = convToNum;

    
    TotalAmount -= Number(data.price)
    document.getElementById('TotalAmount').innerHTML = `$${TotalAmount}`

    //total item dicount 12.00
    GrandTotal = TotalAmount - itemDiscount

    //29.49    5%  online discount
    GrandTotal = GrandTotal - OnlineCardDiscount
    GrandTotal = (GrandTotal*Gst)/100;
    document.getElementById('GrandTotal').innerHTML = `$${GrandTotal}`
    document.getElementById('OverAllTotal').innerHTML = `$${GrandTotal}`

    if(convToNum === 0){
      let prdBtn = document.getElementById(`prd-btn-${id}`)
      if(prdBtn){
        prdBtn.style.display = 'block'
      }
      let prdbtnCart = document.getElementById(`prd-btn-addcart-${id}`)
      if(prdbtnCart){
        prdbtnCart.style.display = 'none';
      }
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



///search item
let serachForm = document.querySelector('[role="search"]')
let inp = serachForm[0]
let sbtn = serachForm[1]

  inp.addEventListener('input',(e)=>{
    if(inp.value){
      let searchdivs = document.getElementById('searchoption')
      if(searchdivs){
        searchdivs.remove();
      }
      let searchdiv = document.createElement('div')
      searchdiv.id = 'searchoption'
      searchdiv.className = 'searchdiv'
      let ul = document.createElement('ul')
      ul.type = 'none'
      fetch(`https://dummyjson.com/products/search?q=${inp.value}`)
      .then(response=>response.json())
      .then(result=> { 
        console.log(result)
        result.products.map( (item)=>{
          let li = document.createElement('li')
          li.innerText = item.title         
          ul.appendChild(li)
        })      
      })
      searchdiv.appendChild(ul)
      serachForm.appendChild(searchdiv)
    }
    else{
      let searchdiv = document.getElementById('searchoption')
      if(searchdiv){
        searchdiv.remove();
      }
    }
  })



sbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let inpvalue = inp.value;
    if(inpvalue){      
      window.location.href = `../Component/serachProduct.html?search&q=${inpvalue}`
    }
})
