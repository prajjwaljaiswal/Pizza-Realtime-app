import axios from 'axios'

let addToCart = document.querySelectorAll('.add-to-cart');
let cart_counter = document.querySelector('.cart-counter');

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        cart_counter.innerHTML = " " + res.data.totalQty;
    });

}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = btn.dataset.pizza;
        updateCart(JSON.parse(pizza));
    })
})