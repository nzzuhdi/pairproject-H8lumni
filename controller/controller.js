const { Post } = require("../models")

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

    // share post detail
    static sharePostPage(req, res){
        const id = req.params.postId;

        Post.findByPk(id)
        .then(data => {
            res.render('postPage', {data})
        })
        .catch(err => {
            res.send(err)
        });
    }
}


module.exports = Controller