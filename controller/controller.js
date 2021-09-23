class Controller{
    static landingPage(req,res){
        res.render('landingPage')
    }

    static addUser(req,res){
        res.render('addUser')
    }

    static homePage(req,res){
        res.render('homePage')
    }

    static addPost(req,res){
        res.redirect('homePage')
    }

    static profilePage(req,res){
        res.render('profiles')
    }

    static sharesPage(req,res){
        res.render('sharesPage')
    }
    static addShares(req,res){
        res.render('addShares')
    }

    static sharePostPage(req,res){
        res.render('postPage')
    }
}


module.exports = Controller