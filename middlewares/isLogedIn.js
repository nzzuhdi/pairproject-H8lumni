function isLogedIn(req, res, next) {
    if(req.session.logedIn) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = isLogedIn;