//const btn = document.getElementById('add-cart');
//const addButton = document.getElementById('add-cart');
const addButtonMobile = document.getElementById('cart-button-mobile');

document.addEventListener('DOMContentLoaded', () => {
    addButton.addEventListener('click', (evt) => {
        addToCart(evt.target);
    })

})
//Funciones
const addToCart = (event) => {

    // console.log('prueba que trae', , );

    // const product = event.target;
    // console.log(product);
    const producto = {
        id: event.dataset.productid,
        title: event.dataset.productname,
        price: event.dataset.productprice,
        image: event.dataset.productimage,
        qty: 1
    }

    let cart = getCart();

    cart.push(producto);

    console.log(cart);
    // //Obetenemos el carrito desde localStorage
    // //Agregando elementos
    // //actualiza localStorage
    saveCart(cart);
};

saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
};

