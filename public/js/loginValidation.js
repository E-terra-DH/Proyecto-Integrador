window.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById('form-login');
let email = document.getElementById("email");
let password = document.getElementById("contrasena");

form.addEventListener('submit', (e) => {
    let errores = document.querySelector ('.errorLogin .errorList')
    var expRegEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!expRegEmail.test(email.value)){
    email.style.borderLeftColor = "white"
    email.style.borderBottom = "#F23E3E solid 3px"
    e.preventDefault();
    let errorEmail = document.getElementById('error-email')
    if(!errorEmail){
        errores.innerHTML += `<li id='error-email'> > El email no es valido</li>` 
    }
} else {
    email.style.borderBottomColor = "white"
    email.style.borderLeft = "#344E41 solid 1px"
    let errorEmail = document.getElementById('error-email')
    if (errorEmail) {
        errorEmail.remove()
    }
}

if (!password.value){
    password.style.borderLeftColor = "white"
      password.style.borderBottom = "#F23E3E solid 3px"
      e.preventDefault();
      let errorPassword = document.getElementById('error-password')
      if(!errorPassword){
          errores.innerHTML += `<li id='error-password'> > La contraseña no es valida</li>` 
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