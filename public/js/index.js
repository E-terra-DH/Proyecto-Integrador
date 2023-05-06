
window.addEventListener("load", function () {
  let form = document.getElementById("formRegister");
  let email = document.getElementById("casillaEmail");
  let name = document.getElementById("name");
  let lastname = document.getElementById("apellido");
  let password = document.getElementById("contrasena");
  let phone = document.getElementById("phone");
  let image = document.getElementById("avatar")
  
  form.addEventListener("submit", (evt) => {

    let losErrores = document.querySelector('.errores .ulErrores')
    var expRegEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var expRegImage = /.(gif|jpeg|jpg|png)$/;
    if (!expRegEmail.test(email.value)) {
      email.style.borderLeftColor = "white"
      email.style.borderBottom = "#F23E3E solid 3px"
      evt.preventDefault()
      let errorEmail = document.getElementById("error-email")
      if(!errorEmail){
        losErrores.innerHTML += `<li id="error-email"> • El email no es valido </li>`
        
      }
      
    } else {
        email.style.borderBottomColor = "white"
        email.style.borderLeft = "#344E41 solid 1px"
        let errorEmail = document.getElementById("error-email")
        if (errorEmail) {
            errorEmail.remove()
        }
    }

    if (name.value.length < 3) {
        name.style.borderLeftColor = "white"
      name.style.borderBottom = "#F23E3E solid 3px"
      evt.preventDefault()
      let errorName = document.getElementById("error-name")
      if(!errorName){
      losErrores.innerHTML += `<li id="error-name"> • El nombre no es valido </li>`
    }
    } else {
        name.style.borderBottomColor = "white"
        name.style.borderLeft= "#344E41 solid 1px"
        let errorName = document.getElementById("error-name")
        if (errorName) {
            errorName.remove()
        }
    }
    var expRegApellidos = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    if (!expRegApellidos.test(lastname.value)) {
      lastname.style.borderLeftColor = "white"
      lastname.style.borderBottom = "#F23E3E solid 3px"
      evt.preventDefault()
      let errorApellido = document.getElementById("error-apellido")
      if(!errorApellido){
      losErrores.innerHTML += `<li id="error-apellido"> • El apellido no es valido </li>`
    }
    
    } else {
        lastname.style.borderBottomColor = "white"
        lastname.style.borderLeft = "#344E41 solid 1px"
        let errorApellido = document.getElementById("error-apellido")
        if (errorApellido) {
            errorApellido.remove()
        }
    }
    if (password.value.length < 8) {
      password.style.borderLeftColor = "white"
      password.style.borderBottom = "#F23E3E solid 3px"
      evt.preventDefault()
      let errorPassword = document.getElementById("error-password")
      if (!errorPassword) {
        losErrores.innerHTML += `<li id="error-password"> • La constraseña no es valido </li>`
      }
      
    }else {
        password.style.borderBottomColor = "white"
       password.style.borderLeft = "#344E41 solid 1px"
       let errorPassword = document.getElementById("error-password")
       if (errorPassword) {
        errorPassword.remove()
       }
    }
    if (phone.value.length < 10) {
      phone.style.borderBottom = "#F23E3E solid 3px"
      phone.style.borderLeftColor = "white"
      evt.preventDefault()
      let errorPhone = document.getElementById("error-phone")
      if (!errorPhone) {
        losErrores.innerHTML += `<li id="error-phone"> • El telefono no es valido </li>`
      }
     
    }else {
        phone.style.borderBottomColor = "white"
        phone.style.borderLeft = "#344E41 solid 1px"
        let errorPhone = document.getElementById("error-phone")
        if (errorPhone) {
            errorPhone.remove()
           }
    }
    if (!expRegImage.test(image.value)) {
      image.style.backgroundColor = "red";
      evt.preventDefault()
      let errorImage = document.getElementById("error-image")
      if (!errorImage) {
        losErrores.innerHTML += `<li id="error-image"> • Debes seleccionar una imagen </li>`
    }
    }else {
        image.style.borderBottomColor = "white"
        image.style.borderLeft = "#344E41 solid 1px"
         let errorImage = document.getElementById
         if (errorImage) {
             errorImage.remove()
            }
     
       }
       let estilosInput = document.querySelector(".errores")
       estilosInput.style.color = "black"
       estilosInput.style.fontSize = "16px"
       estilosInput.style.textAlign = "left"
       estilosInput.style.marginTop = "17px"
       estilosInput.style.fontWeight = "600"
  });
});
