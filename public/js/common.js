let contentProducts = document.getElementById('prueba');
const addButton = document.getElementById('add-cart');

getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};