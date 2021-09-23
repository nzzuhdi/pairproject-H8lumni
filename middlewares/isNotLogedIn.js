function isNotLogedIn(req, res, next) {
    if(req.session.logedIn) {
        res.redirect("/home");
    } else {
        next();
    }
}

module.exports = isNotLogedIn;