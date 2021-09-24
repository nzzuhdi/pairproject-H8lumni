const passwordIsMatched = require("../helpers/passwordIsMatched");
const { User, Profile } = require("../models");

class AuthController {
    static getLogin(req, res) {
        let err = req.query.errors;

        res.render("auth/login", {err});
    }

    static postLogin(req, res) {
        const {email, password} = req.body;

        User.findAll({
            where: { email },
            include: Profile
        })
        /*
        TODO: set email constrain to unique
        */
        .then(data => {
            // check password
            if(passwordIsMatched(password, data[0].password)) {
                // set session value
                req.session.userId = data[0].id;
                req.session.username = data[0].username;
                req.session.userImage = data[0].Profile.image;
                req.session.logedIn = true;

                res.redirect("/home");
            } else {
                res.redirect("/login?errors=wrong_password");
            }
            
        })
        .catch(err => {
            console.log(err);
            res.redirect("/login?errors=wrong_email");
        });
    }

    static getRegister(req, res) {
        const err = req.query.err;
        console.log(err);

        let errors = {
                fullname: (err) ? err.includes("fullname") : false,
                 username:(err) ? err.includes("username") : false,
                 email:(err) ? err.includes("email") : false,
                 password:(err) ? err.includes("password") : false,
                 age:(err) ? err.includes("age") : false,
                 gender:(err) ? err.includes("gender") : false,
                 image:(err) ? err.includes("image") : false,
                 batch: (err) ? err.includes("batch") : false,
                 msg: []
            };
        
        if(err) {
            if(err.includes("username already used")) {
                errors.msg[0] = "username already used";
            } else if(err.includes("email already used")) {
                errors.msg[1] = "email already used";
            }
        }


        console.log("validation error");
        res.render("auth/register", {errors});
    }

    static postRegister(req, res) {
        const {fullname, username, email, password, age, gender, image, batch} = req.body;
        const input = {
            username,
            email,
            password 
        }

        let id = 0;
        // let userCreated = false;
        User.create(input)
        .then(data => {
            id = data.id;
            // userCreated = true;
            return Profile.create({
                fullname,
                age, 
                gender, 
                image, 
                batch,
                UserId: data.id
            })
        })
        .then(() => {
            res.redirect("/login");
        })
        .catch(err => {
            if(id) {
                console.log("========================================================== yes");
                User.destroy({
                    where: { id }
                })
                .then(()=>{}).catch(err => console.log(err));
            }

            console.log(err);
            if(err.name === "SequelizeValidationError") {
                err = err.errors.map(e => {
                    return e.message;
                });

                res.redirect(`/register?err=${err}`);
            }
            res.send(err);
        });
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}

module.exports = AuthController;