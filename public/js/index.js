
window.addEventListener("load", function () {
  let form = document.getElementById("formRegister");
  let email = document.getElementById("casillaEmail");
  let name = document.getElementById("name");
  let lastname = document.getElementById("apellido");
  let password = document.getElementById("contraseña");
  let phone = document.getElementById("phone");
  let image = document.getElementById("avatar");
  
  form.addEventListener("submit", (evt) => {
    let errores = [];
    var expRegEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!expRegEmail.test(email.value)) {
      email.style.borderLeftColor = "white"
      email.style.borderBottom = "#F23E3E solid 3px"
      errores.push ('El email no es valido')
      
      
    } else {
        email.style.borderBottomColor = "white"
        email.style.borderLeft = "#344E41 solid 1px"
    }

    if (name.value.length < 3) {
        name.style.borderLeftColor = "white"
      name.style.borderBottom = "#F23E3E solid 3px"
      errores.push ('El nombre no es valido')
      
      
    } else {
        name.style.borderBottomColor = "white"
        name.style.borderLeft= "#344E41 solid 1px"
    }
    var expRegApellidos = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    if (!expRegApellidos.test(lastname.value)) {
      lastname.style.borderLeftColor = "white"
      lastname.style.borderBottom = "#F23E3E solid 3px"
      errores.push ('El apellido no es valido')
      
    
    } else {
        lastname.style.borderBottomColor = "white"
        lastname.style.borderLeft = "#344E41 solid 1px"
    }
    if (password.value.length < 8) {
      password.style.borderLeftColor = "white"
      password.style.borderBottom = "#F23E3E solid 3px"
      errores.push ('La contraseña no es valida')
      
    }else {
        password.style.borderBottomColor = "white"
       password.style.borderLeft = "#344E41 solid 1px"
    }
    if (phone.value.length < 9) {
      phone.style.borderBottom = "#F23E3E solid 3px"
      phone.style.borderLeftColor = "white"
      errores.push ('El celular no es valido')
      
     
    }else {
        phone.style.borderBottomColor = "white"
        phone.style.borderLeft = "#344E41 solid 1px"
    }
    var expRegImage = /.(gif|jpeg|jpg|png)$/;
    if (!expRegImage.test(image.value)) {
      image.style.borderBottom = "#F23E3E solid 3px"
      image.style.borderLeftColor = "white"
      errores.push ('Debes seleccionar una imagen')
     
     
    }else{
        image.style.borderBottomColor = "white"
        image.style.borderLeft = "#344E41 solid 1px"
    }

    if (errores.length >0) {
      evt.preventDefault()
      let losErrores = document.querySelector('.errores')
      for (let i = 0; i < errores.length; i++) {
       losErrores.innerHTML = "<ul>" + errores[i] + "</ul>"
      } 
      
    }
   
  });
});
