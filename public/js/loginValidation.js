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

function validarFormulario(e) {
   let input = e.target 
   if (input.tagName == 'INPUT'){
    //validar el error
    if (!input.value.length) {
        input.style.borderBottomColor = 'red';
        input.style.color = 'red';
        //como estoy en el elemento llamo al error directo con el mensaje. 
        mostrarError(input, 'Debe ingresar un valor');
    } else {
        input.style.borderBottomColor = 'green';
        input.style.color = 'black';
    }
   }
}
let contentError = document.getElementById('error');
function mostrarError(input, error) {
    //al tener un div que renderiza los errores, atrapar el div y hacer un ul o li de ese error. 
    contentError.innerHTML += `
    <p class='error'>${error}</p>
    ` 
}