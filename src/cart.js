let classes = (classes)=> document.getElementsByClassName(classes);
let id = (id) => document.getElementById(id);

let label = id("label");
let shopingCart = id("shoping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculate = ()=>{

    let cart = id("cartamount");

    let cart_val = basket.map((x)=> x.item).reduce((x,y)=> x + y, 0);

    cart.innerHTML = cart_val;
}

let generateCartItems = () => {
    if(basket.length !== 0) {
        return (shopingCart.innerHTML = basket.map((x)=>{
            let {id, item} = x;
            let search = shopItems.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
            <img width="150" height="120" src="${search.img}"/>

            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="price">$ ${search.price}</p>
                    </h4>
                    <i onclick="deleteItem(${id})" class="bi bi-x-lg"></i>
                </div>

                
                <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg" id="minus"></i>
                            <div id="${id}" class="qty"> ${item} </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg" id="plus"></i>
                </div>

                <h3 class="total-amount">$ ${search.price * item} </h3>
                

            </div>
            </div>
            
            `;
        }).join(""));
    }

    
    else {
        shopingCart.innerHTML = ``;

        label.innerHTML = `
        <h2>Cart is Empty!</h2>
            <a href="index.html">
                <button class="homeBtn">Back to Home</button>
            </a>
        `;
    }

};

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
    
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem);
    generateCartItems();

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
    
    generateCartItems()

}

let update = (selectedItem)=>{
    let search = basket.find((x)=> x.id === selectedItem.id);
    selectedItem.innerHTML = search.item;
    calculate();
    totalBill();
}

let deleteItem = (id) => {
    let selectedItem = id;

    basket = basket.filter((x) => selectedItem.id !== x.id);
    localStorage.setItem("data", JSON.stringify(basket));
    calculate()
    totalBill();
    generateCartItems();


}

let totalBill = () => {
    if(basket.length!==0) {
        let totalAmount = basket.map((x)=> {
            let {item, id} = x;

            let search = shopItems.find((y)=>y.id===id) || [];
            return search.price * item;
        }).reduce((x,y)=>x+y,0);
        
         label.innerHTML= `
            <h2>Total Bill : $ ${totalAmount}</h2>

            <button onclick="" class="checkout">Check Out</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
         `;
        }
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
    calculate()
}


generateCartItems();
calculate();
totalBill();