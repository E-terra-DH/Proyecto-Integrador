let form = document.getElementById("form-create-p");
let errorName = document.querySelector(".nameProductError")
let errorDescription = document.querySelector(".descriptionProductError")
let errorCantidad = document.querySelector(".cantidadProductError")
let errorPrecio = document.querySelector(".priceProductError")
// let errorImagen = document.querySelector("imageProductError")
window.addEventListener('DOMContentLoaded', contentLoaded)


  function contentLoaded() {
    //Add register event
    form.addEventListener('submit', create);

  function create(evt){
    let errors = {}
    if(form.name.value.length < 5) errors.name = 'El Nombre debe tener más de 2 caracteres'
    if(form.descripcion.value.length < 2) errors.descripcion = 'La descripción debe ser mas larga'
    if(form.precio.value.length < 2) errors.precio = 'El precio no es valido'
    if(form.cantidad.value.length <= 0) errors.cantidad = 'La cantidad no es valida'
      
    console.log("errors", errors);
    if (Object.keys(errors).length >= 1) {
      evt.preventDefault();
     errorName.innerHTML = (errors.name) ? `<li> ${errors.name} </li>` : '';
     errorDescription.innerHTML = (errors.descripcion) ? `<li> ${errors.descripcion} </li>` : '';
     errorCantidad.innerHTML = (errors.cantidad) ? `<li> ${errors.cantidad} </li>` : '';
     errorPrecio.innerHTML = (errors.precio) ? `<li> ${errors.precio} </li>` : '';
    } else {
      form.submit();
    }
  }

  };