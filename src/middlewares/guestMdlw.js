/*Midelware que verifica si el ususario tiene un perfil, contraseña y esta logeado para que 
pueda ir a cierta pagina 
ejemplo: visita la pagina pero quiere ir a carrito, ahi le pido que este loggeado sino lo mando 
a login, para que lo haga
*/

const guestMdwl = (req, res, next) => {
    if (!req.session.userLogged) { // && !req.cookies.userLogged) {
        return res.redirect('/login');
    }
    next();
    
};


module.exports = guestMdwl;

//OTRA OPCIÓN

//Si tengo a alguien en sessión. quiero que automáticamente mi sistema lo redirija al login

// const guestMdwl = (req, res, next) => {
//     if (req.session.userLogged) {        // si tengo al usuario logueado en sesión
//         return res.redirect('/profile'); // quiero redirigir a esta persona a su perfil
//     }
//     next();                              // si no, quiero que el request siga con us cadena de peticiones
    
// };
