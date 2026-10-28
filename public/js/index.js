

  let form = document.getElementById("formRegister");
  let emailError = this.document.querySelector(".emailError");
  let nameError = this.document.querySelector(".nameError");
  let lastnameError = this.document.querySelector(".lastnameError");
  let passwordError = this.document.querySelector(".passwordError");
  let phoneError = this.document.querySelector(".phoneError");
  //let imageError = document.getElementById("avatar")
  window.addEventListener('DOMContentLoaded', contentLoaded)


  function contentLoaded() {
    //Add register event
    form.addEventListener('submit', register);

  function register(evt){
    let errors = {}
    if(!validator.isEmail(form.casillaEmail.value)) errors.casillaEmail = 'El email debe ser válido'
    if(form.name.value.length < 2) errors.name = 'El Nombre debe tener más de 2 caracteres'
    if(form.apellido.value.length < 2) errors.apellido = 'El Apellio debe tener más de 2 caracteres'
    if(form.contrasena.value.length < 8) errors.contrasena = 'La contraseña debe tener 8 caracteres'
    if(form.phone.value.length < 8) errors.phone = 'El telefono no es valido '
      

    console.log("errors", errors);
    if (Object.keys(errors).length >= 1) {
      evt.preventDefault();
     emailError.innerHTML = (errors.casillaEmail) ? `<li> ${errors.casillaEmail} </li>` : '';
     nameError.innerHTML = (errors.name) ? `<li> ${errors.name} </li>` : '';
     lastnameError.innerHTML = (errors.apellido) ? `<li> ${errors.apellido} </li>` : '';
     passwordError.innerHTML = (errors.contrasena) ? `<li> ${errors.contrasena} </li>` : '';
     phoneError.innerHTML = (errors.phone) ? `<li> ${errors.phone} </li>` : '';
    } else {
      form.submit();
    }
  }

  };