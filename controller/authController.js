const hashPassword = require("../helpers/hashPassword");
const passwordIsMatched = require("../helpers/passwordIsMatched");
const { User } = require("../models");

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
                res.redirect("/H8lumni");
            } else {
                res.redirect("/login?errors=wrong_password");
            }
            
        })
        .catch(err => {
            res.redirect("/login?errors=wrong_email");
            // res.send(err);
        });
    }

    static getRegister(req, res) {
        res.render("auth/register");
    }

    static postRegister(req, res) {
        const {username, email, password} = req.body;
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
            res.redirect("/login");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    }
}

module.exports = AuthController;