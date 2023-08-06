


const firebaseConfig = {
  apiKey: "AIzaSyB4N7NGeeDSS2hGZ2ArctZjvMMgwtNHiQg",
  authDomain: "quikdeal-e6901.firebaseapp.com",
  projectId: "quikdeal-e6901",
  storageBucket: "quikdeal-e6901.appspot.com",
  messagingSenderId: "724552483656",
  appId: "1:724552483656:web:b79a4f0d38dfd8d060297d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);





function displayUserShow(name){
    let afdiv =  document.querySelectorAll('.afterlogin')
    let bediv = document.querySelectorAll('.beforelogin')
    let username = document.getElementById('username')
    username.style.textTransform = "capitalize"
    username.innerText = name.split(' ')[0]
    afdiv.forEach((element)=>{
        element.style.display = 'unset'
    })
    bediv.forEach((element)=>{
        element.style.display = 'none'
    })
}
function displayUserHide(){
    let afdiv =  document.querySelectorAll('.afterlogin')
    let bediv = document.querySelectorAll('.beforelogin')
    
    afdiv.forEach((element)=>{
        element.style.display = 'none'
    })
    bediv.forEach((element)=>{
        element.style.display = 'unset'
    })
}

//check user
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      displayUserShow(user.displayName)      
    } else {
      displayUserHide()
    }
  });
  