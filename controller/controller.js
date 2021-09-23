class Controller{
    static landingPage(req,res){
        res.render('landingPage')
    }

    static homePage(req,res){
        res.render('homePage')
    }

    static profilePage(req,res){
        res.render('profilePage')
    }

    static sharesPage(req,res){
        res.render('sharesPage')
    }

    static sharePostPage(req,res){
        res.render('postPage')
    }
}


module.exports = Controller