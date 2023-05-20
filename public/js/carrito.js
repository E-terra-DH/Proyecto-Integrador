
//Variables
const addProduct = document.querySelector('#prueba');
document.addEventListener('click', (e) => {

    e.preventDefault();

    let btnCart = e.target
    console.log(btnCart);
    if (btnCart.id == "prueba") {


    }


});





// cargar();
// function cargar() {
//     addProduct.addEventListener('click', agregando)

//}


// Funciones









// function agregando(e) {
//     
//     if (e.target.classList.contains('add-cart')) {
//         const productoSeleccionado = e.target.parentElement.parentElement.parentElement;


//         leeProducto(productoSeleccionado);
//     }
// }

// leeProducto = (producto) => {
//     //    console.log(producto);

//     //obejeto con el producto seleccionado
//     const carrito = {
//         imagen: producto.querySelector('img').src,
//         nombre: producto.querySelector('h2').textContent,
//         precio: producto.querySelector('h3.price').textContent,
//         id: producto.querySelector('a.delete').textContent

//     }

//     console.log(carrito);
// }