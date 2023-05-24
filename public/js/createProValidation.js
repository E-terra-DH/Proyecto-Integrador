window.addEventListener("load", function () {
    let form = document.getElementById("form-create-p");
    let name = document.getElementById("name");
    let categoria = document.getElementById("categoria");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");
    let cantidad = document.getElementById("cantidad");
    //let image = document.getElementById("");
    
    form.addEventListener('submit', (e) => {
      let errores = document.querySelector ('.errorCreate .erroresList')
  if (!name.value){
      name.style.borderLeftColor = "white"
      name.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorName = document.getElementById('error-name')
      if(!errorName){
          errores.innerHTML += `<p id='error-name' > Ingrese un nombre valido</p>` 
      }
  } else {
      name.style.borderBottomColor = "white"
      name.style.borderLeft = "#344E41 solid 1px"
      let errorName = document.getElementById('error-name')
      if (errorName) {
          errorName.remove()
      }
  }
  
//   if (!categoria.value){
//     let checkbox = document.getElementsByName('groupCheckbox[]');
//     let contador = 0;
//     for(var i=0; i< checkbox.length; i++) {
//         if(checkbox[i].checked)
//             contador++
//     }
//     if(contador ==0){
//         categoria.style.borderLeftColor = "white"
//         categoria.style.borderBottom = "#F23E3E solid 3px"
//         e.preventDefault();
//         let errorCategoria = document.getElementById('error-categoria')
//         if(!errorCategoria){
//             errores.innerHTML += `<p id='error-categoria' La categoría no es valida</p>` 
//         }
// }
     
//   } else {
//       categoria.style.borderBottomColor = "white"
//      categoria.style.borderLeft = "#344E41 solid 1px"
//      let errorCategoria = document.getElementById('error-categoria')
//      if (errorCategoria) {
//          errorCategoria.remove()
//      }
//   }
  if (!descripcion.value){
    descripcion.style.borderLeftColor = "white"
      descripcion.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorDescripcion = document.getElementById('error-descripcion')
      if(!errorDescripcion){
          errores.innerHTML += `<p id='error-descripcion' La categoría no es valida</p>` 
      }
} else {
    descripcion.style.borderBottomColor = "white"
   descripcion.style.borderLeft = "#344E41 solid 1px"
   let errorDescripcion = document.getElementById('error-descripcion')
   if (errorDescripcion) {
       errorDescripcion.remove()
   }
}  if (!precio.value){
    precio.style.borderLeftColor = "white"
      precio.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorPrecio = document.getElementById('error-precio')
      if(!errorPrecio){
          errores.innerHTML += `<p id='error-precio' El precio no es valido</p>` 
      }
} else {
    precio.style.borderBottomColor = "white"
   precio.style.borderLeft = "#344E41 solid 1px"
   let errorPrecio = document.getElementById('error-precio')
   if (errorPrecio) {
       errorPrecio.remove()
   }
}  if (!cantidad.value){
    cantidad.style.borderLeftColor = "white"
      cantidad.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorCantidad = document.getElementById('error-cantidad')
      if(!errorCantidad){
          errores.innerHTML += `<p id='error-categoria' Indique una cantidad</p>` 
      }
} else {
    cantidad.style.borderBottomColor = "white"
   cantidad.style.borderLeft = "#344E41 solid 1px"
   let errorCantidad = document.getElementById('error-cantidad')
   if (errorCantidad) {
       errorCantidad.remove()
   }
}
      });
  })