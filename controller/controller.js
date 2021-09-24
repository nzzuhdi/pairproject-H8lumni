
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
            // console.log(data);
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
        const search = req.query.search;
        const sort = req.query.sort;
        console.log(req.query);
        let opt = {
            include: User,
            order: [["createdAt", "DESC"]],
            where: {}
        }

        if(search) {
            opt.where.title = { [Op.iLike]: `%${search}%` };
        }

        if(sort === "title") {
            opt.order = [["title", "ASC"]]
        } else if(sort === "mostRecent") {
            opt.order = [["createdAt", "DESC"]]
        }

        Share.findAll(opt)
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
        console.log(id);

        Share.findByPk(id,{
            include: [{
                model: User,
                include: [{
                    model: Profile
                }]
            }]
        })
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


    static editProfile(req, res) {
        const username = req.params.username;

        console.log('ini laman edit');
        User.findOne({
            where: {
                username
            },
            include: [Profile, Share]
        })
        .then(data => {
            res.render("profile/edit", {data});
        })
        .catch(err => {
            res.send(err);
        })
    }

    static postEditProfile(req, res) {
        
        const username = req.params.username;
        const id = Profile.UserId
        const{fullname, email, age, gender, image, batch} = req.body;
        const input = {
            fullname,
            age: Number(age),
            gender,
            batch: Number(batch),
            image,
            email
        }
        
        console.log("profile input:", input,id);
        Profile.update(
           input,{
               where:{
                   UserId: req.session.userId
               },
               include: [User]
            }
        )
        .then((data) => {
            // console.log(data);
            res.redirect(`/profile/${username}`);
        })
        .catch(err => {
            res.send(err);
        })
    }


    static editSharePost(req, res) {
        const id = req.params.postId;
        let dataEdit;
        
        Share.findOne({
            where: { id }
        })
        .then((data) => {
            res.render(`editShare`,{data});
        })
        .catch(err => {
            res.send(err);
        })
    }
    static postEditShare(req, res) {
       
        const UserId = Number(req.params.postId);
        const{title, content} = req.body;
        const input = {
            title,
            content
        }
        
        console.log("share input:", input, UserId);
        Share.update(
           input,{
                where:{
                    id:UserId
                }
            }
        )
        .then((data) => {
            console.log(data);
            res.redirect(`/shares/${UserId}`);
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