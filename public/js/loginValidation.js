//capturar los elementos
const form = document.getElementById('form-login');
//espera que se cargue el dom, el doc con todos los html css etc. 
document.addEventListener('DOMContentLoaded', login);

//funciones
function login(){
form.email.addEventListener('blur', validarFormulario)
form.password.addEventListener('blur', validarFormulario)

form.addEventListener('submit', registrarUsuario)
}
function registrarUsuario(e){
e.preventDefault();

if (form.email.value == ""){
    alert("Debes ingresar tu email")
}

if (form.password.value == ""){
    alert("Debes ingresar tu contraseña")
}

}
