const contentProducts = document.getElementById('add-cart');
const addButton = document.getElementById('add-cart');
const addButtonMobile = document.getElementById('cart-button-mobile');

document.addEventListener('DOMContentLoaded', () => {
    addButton.addEventListener('click', (evt) => {
        addToCart(evt.target);
    })
    addButtonMobile.addEventListener('click', (evt) => {
        addToCart(evt.target);
    })
})


const renderProduct = (product) => {
    contentProducts.innerHTML += `
    <h4>${product.title} </h4>
    <h5>$${product.price} </h5>
    <img src="${product.image}" width="150">
    <button data-id="${product.id}"
    data-title="${product.title}"
    data-image="${product.image}"
    data-price="${product.price}"</button>`


}


//Funciones
const addToCart = (btn) => {
    console.log('prueba que trae', btn);
    let producto = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        price: btn.dataset.price,
    }
}