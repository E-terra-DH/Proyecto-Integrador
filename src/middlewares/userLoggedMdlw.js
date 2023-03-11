function userLoggedMdlw (req, res, next) {

    res.locals.isLogged = false; //esta variable me va a servir para mostrar o no una parte de la barra de navegación

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;

        //Puedo pasar lo que tengo en sesión a una variable local
        res.locals.userLogged = req.session.userLogged;
        //Así puedo requerir directamente información guardada dentro de userLogged en mi vista.
    }

        
    if(req.cookies && req.cookies.userLogged){
        res.locals.userLogged=req.cookies.userLogged;
    }
    
    next();
}

module.exports = userLoggedMdlw;