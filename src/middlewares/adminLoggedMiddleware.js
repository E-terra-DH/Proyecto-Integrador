const adminLoggedMiddleware = (req, res, next) => {
    res.locals.adminLogged = false; //esta variable me va a servir para mostrar o no una parte de la barra de navegación

    if (req.session && req.session.admin) {
        res.locals.adminLogged = true;

        //Puedo pasar lo que tengo en sesión a una variable local
        res.locals.adminLogged = req.session.admin;
        //Así puedo requerir directamente información guardada dentro de userLogged en mi vista.
    };
        
    if(req.cookies && req.cookies.adminLogged) {
        res.locals.adminLogged=req.cookies.adminLogged;
    };
    
    next();
}

module.exports = adminLoggedMiddleware;