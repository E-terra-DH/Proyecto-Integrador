//const addButton = document.getElementById('add-cart');
document.addEventListener('DOMContentLoaded', () => {
})

const renderCart = () => {
    let cart = getCart();

    cart.forEach(product => {


        const renderProduct = (product) => {
            contentProducts.innerHTML += `
            <h4>${product.title} </h4>
            <h5>$${product.price} </h5>
            <img src="${product.image}" width="150">
            <br>`;

        };

        console.log('prueba de llamado', renderProduct);
    });
}