const { post } = require("../routes")
const {Post, Profile, User,Share} = require("../models");
const { Op } = require("sequelize")

class Controller{
    static landingPage(req,res){
        res.render('landingPage')
    }

    static addUser(req,res){
        res.render('addUser')
    }

    static homePage(req,res){
        // let option = {
        //     include: [User,Profile,Post],
        // }
        Post.findAll()
        .then(data=>{
            console.log(data);
            res.render('homePage', {data})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static addPost(req,res){
        const {content} = req.body 
        Post.create(req.body)
        .then(()=>{
            res.redirect('/H8lumni/home')
        })
        .catch((err)=>{
            res.send (err)
        })
    }

    static profilePage(req,res){
        res.render('profiles')
    }
    
    static sharesPage(req,res){
        Share.findAll()
        .then(data=>{
            res.render('sharesPage',{data})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static addShares(req,res){
        res.render('addShares')
    }
    static postAddShares(req,res){
        const{content} = req.body
        Share.create(req.body)
        .then(()=>{
            res.redirect('/H8lumni/shares')
        })
      .catch((err)=>{
          res.send(err)
      })
    }

    static sharePostPage(req,res){
        res.render('postPage')
    }
}


module.exports = Controller