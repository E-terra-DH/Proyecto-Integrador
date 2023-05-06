window.addEventListener("load", function () {
    let form = document.getElementById("form-create-p");
    let name = document.getElementById("name");
    let categoria = document.getElementById("categoria");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");
    let cantidad = document.getElementById("cantidad");
    //let image = document.getElementById("");
    
    form.addEventListener('submit', (e) => {
      let errores = document.querySelector ('.errorLogin .errorList')
  if (!name.value){
      name.style.borderLeftColor = "white"
      name.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorName = document.getElementById('error-name')
      if(!errorName){
          errores.innerHTML += `<p id='error-name' el email no es valido</p>` 
      }
  } else {
      email.style.borderBottomColor = "white"
      email.style.borderLeft = "#344E41 solid 1px"
      let errorEmail = document.getElementById('error-email')
      if (errorEmail) {
          errorEmail.remove()
      }
  }
  
  if (!passwword.value){
      password.style.borderLeftColor = "white"
        password.style.borderBottom = "#F23E3E solid 3px"
        e.preventDefault();
        let errorPassword = document.getElementById('error-password')
        if(!errorPassword){
            errores.innerHTML += `<p id='error-password' La contraseña no es valida</p>` 
        }
  } else {
      password.style.borderBottomColor = "white"
     password.style.borderLeft = "#344E41 solid 1px"
     let errorPassword = document.getElementById('error-password')
     if (errorPassword) {
         errorPassword.remove()
     }
  }
  
      });
  })