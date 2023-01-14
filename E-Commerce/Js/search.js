let searchData = []
let filterData = [];
let searchingProduct = '';

window.addEventListener('load',()=>{
    let q = window.location.href.split('&')[1].split('=')[1]
    searchingProduct = q;
    fetch(`https://dummyjson.com/products?limit=100`)
    .then(response=>response.json())
    .then((result)=>
        {
            let newfilterdata = result.products.filter((data)=>{               
                return data.brand.toLowerCase().indexOf(`${q.toLowerCase()}`) !== -1 || data.category.toLowerCase().indexOf(`${q.toLowerCase()}`) !== -1 || data.title.toLowerCase().indexOf(`${q.toLowerCase()}`) !== -1               
            })           
            searchData.push(...newfilterdata)
            filterData.push(...newfilterdata)            
            displayFilterProducts(searchData,q)
        })
})

function displayFilterProducts(result,q){
    let serchprd = document.getElementById('search-prd')

    serchprd.innerHTML = `<div id="" class="grid-product-heading"> 
        <div id='showingTotal'></div>
        <div class='filter'>
            <div id="filter-head" class='filter-head'>sort by: featured <i class="fa-solid fa-caret-down"></i></div>
            <div class='filter-option'>
                <ul>
                    <li onClick={filterLowToHigh()}>Price: Low to High</li>
                    <li onClick={filterHighToLow()}>Price: High to Low</li>
                </ul>   
            </div>
        </div>    
    </div>`


    let totalprd = document.getElementById('showingTotal')  

        
        totalprd.innerHTML = `Showing 1 – ${result.length} of ${result.length} results for "${q}"`
        result.length === 0 ? 
        serchprd.innerHTML += ` 
        <div class="No-data-found">
        <img src="../Img/NoData.jpg" alt="">
        </div>`:     
        result.map((product)=>{        
        serchprd.innerHTML += `<div id=${product.id} class="serch-card">
        <div class="serch-img">
            <img src="${product.thumbnail}" alt="">
        </div>
        <div class="serch-body">
            <div class="serch-body-title">${product.title} - ${product.description}</div>
            <div class="serch-body-starRating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span>(${product.rating})</span>
            </div>
            <div class="serch-body-limited">
                Limted time deal
            </div>
            <div class="serch-body-prices">
                <span>$${product.price}</span>
                <sub>31,999</sub>
                <span>(${product.discountPercentage}% off)</span>
            </div>
            <p>Save extra with No Cost EMI</p>
            <div class="serch-body-divivery-time">
                Get it as soon as <span>Tomorrow 6AM - 10AM</span>
            </div>
            <div class="serch-body-dilivery-free">
                Free Delivery by Quickdeal
            </div>
        </div>
    </div>`
    })
}

document.getElementById('priceRange').addEventListener('input',(e)=>{
    document.getElementById('pricerangeVal').innerText = e.target.value;
})


function filterPrice(prdList,lowprice,highprice){
    return prdList.filter((data)=>{return (Number(data.price) >= lowprice) && (Number(data.price) <= highprice)})
}
document.getElementById('priceRange').addEventListener('change',(e)=>{
    let inpval = Number(e.target.value);
    let pricefilter = filterPrice(searchData,0,inpval)
    filterData = [...pricefilter]
    displayFilterProducts(filterData,searchingProduct)
})

function filminormaxprice(){
    let minprice = document.getElementById('price-min').value
    let maxprice = document.getElementById('price-max').value

    let pricefilter = filterPrice(searchData,minprice,maxprice)
    filterData = [...pricefilter]      
    displayFilterProducts(filterData,searchingProduct)
}

function filterLowToHigh(){
    filterData.sort((a,b)=>{return Number(a.price) - Number(b.price)})
    displayFilterProducts(filterData,searchingProduct)
    document.getElementById('filter-head').innerHTML = `sort by: price: Low to High`
}
function filterHighToLow(){
    filterData.sort((a,b)=>{return Number(b.price) - Number(a.price)})
    displayFilterProducts(filterData,searchingProduct)
    document.getElementById('filter-head').innerHTML = `sort by: price: High to Low`
}

