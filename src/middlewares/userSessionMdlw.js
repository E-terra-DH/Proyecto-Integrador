/*
Revisa que la seion que inicio el usuario tenga, clave coreccta, una sesion iniciada y que las cookies esten guardadas para que vuelva cuando quiere
*/

const userSessionMdlw=(req,res,next)=>{
    // if(req.cookies && req.cookies.userLogged){
    //     res.locals.userLogged=req.cookies.userLogged;
    // }

    if(req.session && req.session.userLogged){
        res.locals.userLogged=req.session.userLogged;
    }
    next();
};

module.exports=userSessionMdlw;