window.addEventListener("load", function () {
    let form = document.getElementById("form-create-p");
    let name = document.getElementById("name");
    let categoria = document.getElementById("categoria");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");
    let cantidad = document.getElementById("cantidad");
    let image = document.getElementById("image");
    
    form.addEventListener('submit', (e) => {
      var expRegImage = /.(gif|jpeg|jpg|png)$/;
      let errores = document.querySelector ('.errorCreate .erroresList')
  if (name.value.length < 5){
      name.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorName = document.getElementById('error-name')
      if(!errorName){
          errores.innerHTML += `<p id='error-name' > • El nombre debe contener al menos 5 caracteres</p>` 
      }
  } else {
      name.style.borderBottomColor = "white"
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
  if (descripcion.value.length < 100){
      descripcion.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorDescripcion = document.getElementById('error-descripcion')
      if(!errorDescripcion){
          errores.innerHTML += `<p id='error-descripcion'> • La descripción debe ser mas larga</p>` 
      }
} else {
    descripcion.style.borderBottomColor = "white"
   let errorDescripcion = document.getElementById('error-descripcion')
   if (errorDescripcion) {
       errorDescripcion.remove()
   }
}  if (precio.value.length < 2){
      precio.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorPrecio = document.getElementById('error-precio')
      if(!errorPrecio){
          errores.innerHTML += `<p id='error-precio'> • El precio no es valido</p>` 
      }
} else {
    image.style.borderBottomColor = "white"
   precio.style.borderLeft = "#344E41 solid 1px" 
  let errorPrecio = document.getElementById('error-precio')
   if (errorPrecio) {
       errorPrecio.remove()
   }
}  if (cantidad.value.length <= 0){
      cantidad.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorCantidad = document.getElementById('error-cantidad')
      if(!errorCantidad){
          errores.innerHTML += `<p id='error-cantidad'> • Indique una cantidad</p>` 
      }
} else {
    image.style.borderBottomColor = "white"
   let errorCantidad = document.getElementById('error-cantidad')
   if (errorCantidad) {
       errorCantidad.remove()
   }
}
if (!expRegImage.test(image.value)) {
  image.style.borderBottomColor= "red";
  evt.preventDefault()
  let errorImage = document.getElementById('error-image')
  if (!errorImage) {
    errores.innerHTML += `<p id='error-image'> • Debes seleccionar una imagen </p>`
}
}else {
    image.style.borderBottomColor = "white"
    image.style.borderLeft = "#344E41 solid 1px"
     let errorImage = document.getElementById("error-image")
     if (errorImage) {
         errorImage.remove()
        }
 
   }
})

let estilosInput = document.querySelector(".errorCreate")
       estilosInput.style.color = "black"
       estilosInput.style.fontSize = "16px"
       estilosInput.style.textAlign = "left"
       estilosInput.style.marginTop = "17px"
       estilosInput.style.fontWeight = "600"
    });
  
  