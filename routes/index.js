const router = require('express').Router();
const Controller = require('../controller/controller');
const AuthController = require('../controller/authController');

const session = require('express-session');
const isLogedIn = require('../middlewares/isLogedIn');


router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


router.use(function(req, res, next) {
    res.locals.userData = {
        id: req.session.id,
        username: req.session.username,
        isLogedIn: req.session.logedIn
    }
    next();
});

/*
===== Auth ====
*/
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.get('/register', AuthController.getRegister);
router.post('/register', AuthController.postRegister);
router.get('/logout', AuthController.logout);
// ==================================

router.get('/', Controller.landingPage)

router.get('/H8lumni', Controller.landingPage)
router.get('/H8lumni/register', Controller.addUser)
router.get('/H8lumni/home', Controller.homePage)
router.post('/H8lumni/home', Controller.addPost)

router.get('/H8lumni/profiles',Controller.profilePage)

router.get('/H8lumni/shares',Controller.sharesPage)
router.get('/H8lumni/addShares',Controller.addShares)


// router.use(isLogedIn);
// ======== profile ==========
router.get('/test', (req, res) => { res.render("test")});
router.get('/profile/:username', (req, res) => { res.render("profile") });
router.get('/profile/:username/edit', (req, res) => { res.render("profile/edit") });
// ===========

router.post('/H8lumni/addShares',Controller.postAddShares)
router.get('/H8lumni/shares/:postId', Controller.sharePostPage)

// router.get('/jobs', Controller.listJob)
// router.use('/jobs', jobRoute)
// router.use('/hiring', hirRoute)


module.exports = router