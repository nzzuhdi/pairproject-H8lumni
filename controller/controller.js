
const {Post, Profile, User, Share} = require("../models");
const { Op } = require("sequelize");

class Controller{
    static landingPage(req,res){
        res.render('landingPage')
    }

    static homePage(req,res){
        const opt = {
            include: [{
                model: User,
                include: [{
                    model: Profile
                }]
            }],
            order: [["createdAt", "DESC"]]
        }

        Post.findAll(opt)
        .then(data=>{
            console.log(data);
            res.render('homePage', {data})
        })
        .catch(err =>{
            console.log(err);
            res.send(err)
        })
    }

    static addPost(req,res){
        const {content} = req.body
        const input = {
            content, UserId: req.session.userId
        } 
        Post.create(input)
        .then(()=>{
            res.redirect('/home')
        })
        .catch((err)=>{
            res.send (err)
        })
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
        const UserId = req.session.userId;
        const{title, content} = req.body;
        const input = {
            title,
            content,
            UserId
        }
        console.log("share input:", input);
        Share.create(input)
        .then(()=>{
            res.redirect('/shares')
        })
      .catch((err)=>{
          console.log(err);
          res.send(err)
      })
    }

    // share post detail
    static sharePostPage(req, res){
        const id = req.params.postId;

        Share.findByPk(id)
        .then(data => {
            console.log(data);
            res.render('sharePostPage', {data})
        })
        .catch(err => {
            res.send(err)
        });
    }

    static profile(req, res) {
        const username = req.params.username;

        User.findOne({
            where: {
                username
            },
            include: [Profile, Share]
        })
        .then(data => {
            console.log(data);
            res.render("profile", {data});
        })
        .catch(err => {
            res.send(err);
        })
    }

    static deleteSharePost(req, res) {
        const id = req.params.postId;

        Share.destroy({
            where: { id }
        })
        .then(() => {
            res.redirect(`/profile/${req.session.username}`);
        })
        .catch(err => {
            res.send(err);
        })
    }
}


module.exports = Controller