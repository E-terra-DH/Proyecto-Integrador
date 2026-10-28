let form = document.getElementById("form-login");
let emailError = this.document.querySelector(".emailError");
let passwordError = this.document.querySelector(".passwordError");
window.addEventListener('DOMContentLoaded', contentLoaded)


function contentLoaded() {
  //Add register event
  form.addEventListener('submit', login);

function login(evt){
  let errors = {}
  if(!validator.isEmail(form.email.value)) errors.email = 'El email debe ser válido'
  if(form.contrasena.value.length < 8) errors.contrasena = 'La contraseña es incorrecta'
    

  console.log("errors", errors);
  if (Object.keys(errors).length >= 1) {
    evt.preventDefault();
   emailError.innerHTML = (errors.email) ? `<li> ${errors.email} </li>` : '';
   passwordError.innerHTML = (errors.contrasena) ? `<li> ${errors.contrasena} </li>` : '';
  } else {
    form.submit();
  }
}

};