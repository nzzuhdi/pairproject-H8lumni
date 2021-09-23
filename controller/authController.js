const hashPassword = require("../helpers/hashPassword");
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
            where: { email }
        })
        /*
        TODO: set email constrain to unique
        */
        .then(data => {
            // check password
            if(passwordIsMatched(password, data[0].password)) {
                req.session.userId = data[0].id;
                req.session.username = data[0].username;
                req.session.logedIn = true;

                res.redirect("/H8lumni/home");
            } else {
                res.redirect("/login?errors=wrong_password");
            }
            
        })
        .catch(err => {
            console.log(err);
            res.redirect("/login?errors=wrong_email");
            // res.send(err);
        });
    }

    static getRegister(req, res) {
        res.render("auth/register");
    }

    static postRegister(req, res) {
        const {username, email, password, age, gender, image, batch} = req.body;
        const input = {
            username,
            email,
            password: hashPassword(password) 
        }
        /*
         TODO: Move HashPassword in hook before create
        */

         console.log(input);

        User.create(input)
        .then(() => {
            Profile.create()
        })
        .then(() => {
            res.redirect("/login");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}

module.exports = AuthController;