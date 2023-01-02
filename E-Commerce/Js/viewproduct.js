let allimg = document.getElementsByClassName('component-other-images')[0].children
// console.log(allimg)
for(let img of allimg){
    img.addEventListener('mouseover',()=>{
        let url = img.getAttribute('src')
        let main = document.getElementById('mainbackimages')
        main.style.transitionDuration = '.5s'
        main.style.backgroundImage = `url(${url})`
    })
    // console.log(img)
}