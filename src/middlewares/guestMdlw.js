/*Midelware que verifica si el ususario tiene un perfil, contraseña y esta logeado para que 
pueda ir a cierta pagina 
ejemplo: visita la pagina pero quiere ir a carrito, ahi le pido que este loggeado sino lo mando 
a login, para que lo haga
*/



const guestMdwl = (req, res, next) => {
    if (!req.session.userLogged && !req.cookies.userLogged) {
        return res.redirect('/login');
    }
    next();
    
};


module.exports = guestMdwl;
