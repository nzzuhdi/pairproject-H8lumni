function isLogedIn(req, res, next) {
    // console.log(req.session.username, "=======================");
    if(req.session.logedIn) {
        console.log("loged in ============");
        next();
    } else {
        console.log("not loged in ============");
        res.redirect("/login");
    }
}

module.exports = isLogedIn;