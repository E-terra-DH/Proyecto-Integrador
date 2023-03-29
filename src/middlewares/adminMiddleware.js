const adminMiddleware = (req, res, next) => {
    if (!req.session.admin) {
        return res.redirect('/user/profile')
    }
next();
};


module.exports = adminMiddleware;