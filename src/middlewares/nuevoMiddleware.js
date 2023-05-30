const nuevoMiddleware = (req, res, next) => {

    if (req.session.userLogged.user_categories_id == 1) {
        req.session.userLogged.id

    } else if (!(req.session.userLogged && (req.session.userLogged.user_categories_id == 2 || req.session.userLogged.id == req.params.id))) {

        return res.redirect('/')
    }


    next();
}

module.exports = nuevoMiddleware;