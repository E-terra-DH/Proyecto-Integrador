//const btn = document.getElementById('add-cart');
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


const renderProduct = (data) => {
    data.forEach((product) => {
        contentProducts.innerHTML += renderProduct(product);
        contentProducts.innerHTML += `       
        <button
        data-id="${product.id}"
        data-title="${product.title}"
        data-price="${product.price}"
        data-image="${product.image}"
        </button>`

    });

}


//Funciones
const addToCart = (event) => {
    //console.log('prueba que trae', btn);

    const product = event.target;
    console.log(product);
    const productItem = {
        id: product.dataset.id,
        title: product.dataset.title,
        price: product.dataset.price,
        image: product.dataset.image,
        qty: 1
    }

    console.log(productItem);

    //Obetenemos el carrito desde localStorage
    let cart = getCart();
    //Agregando elementos
    cart.push(producto);
    //actualiza localStorage
    saveCart(cart);
};

saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
};

getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};
