let classes = (classes)=> document.getElementsByClassName(classes);
let id = (id) => document.getElementById(id);

let cards = id("cards");

const myName = "Mujtaba Ahmad";

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCards = () => {
    return (cards.innerHTML = shopItems.map((x)=>{
        let {id, name, price, desc, img} = x;

        let search = basket.find((x) => x.id === id) || []

        return `
        <div id="product_${id}" class="card_1">
                <img src="${img}" width="220" alt="">
                
                <div class="details">
    
                    <h3>${name}</h3>
    
                    <p>${desc}</p>
    
                    <div class="price-quantity">
                        <h2>$ ${price}</h2> 
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg" id="minus"></i>
                            <div id="${id}" class="qty">
                                ${search.item === undefined ? 0: search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg" id="plus"></i>
                        </div>
                    </div>
                    
                </div>
            </div>
        `
    }).join(""));
}

generateCards();


let increment = (id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item:1
        })
    }
    else {
        search.item += 1;
    }

    
    update(selectedItem);

    localStorage.setItem("data", JSON.stringify(basket));

}

let decrement = (id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search===undefined) return;

    else if(search.item === 0) return;
    else search.item -= 1;
    
    update(selectedItem);

    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));

}

let update = (selectedItem, total)=>{
    let search = basket.find((x)=> x.id === selectedItem.id);
    selectedItem.innerHTML = search.item;

    calculate();
}

let calculate = ()=>{

    let cart = id("cartamount");

    let cart_val = basket.map((x)=> x.item).reduce((x,y)=> x + y, 0);

    cart.innerHTML = cart_val;

}

calculate();



