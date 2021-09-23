const router = require('express').Router();
const Controller = require('../controller/controller');
const AuthController = require('../controller/authController');

const session = require('express-session');
const isLogedIn = require('../middlewares/isLogedIn');
const isNotLogedIn = require('../middlewares/isNotLogedIn');


router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


router.use(function(req, res, next) {
    res.locals.userData = {
        id: req.session.id,
        username: req.session.username,
        isLogedIn: req.session.logedIn,
        userImage: req.session.userImage
    }
    next();
});

/*
===== Auth ====
*/
router.get('/login', isNotLogedIn, AuthController.getLogin);
router.post('/login', isNotLogedIn, AuthController.postLogin);
router.get('/register', isNotLogedIn, AuthController.getRegister);
router.post('/register', isNotLogedIn, AuthController.postRegister);
router.get('/logout', isLogedIn, AuthController.logout);
// ==================================

router.get('/', Controller.landingPage);

// router.get('/H8lumni', Controller.landingPage)
// router.get('/H8lumni/home', Controller.homePage)
// router.post('/H8lumni/home', Controller.addPost)

// router.get('/H8lumni/shares',Controller.sharesPage)
// router.get('/H8lumni/addShares',Controller.addShares)


router.use(isLogedIn);

router.get('/test', (req, res) => { res.render("test")}); // test route


router.get('/home', Controller.homePage);
router.post('/home', Controller.addPost);
router.get('/shares',Controller.sharesPage);

router.get('/shares',Controller.sharesPage);
router.get('/addShares',Controller.addShares);
router.post('/addShares',Controller.postAddShares)

router.get('/shares/:postId', Controller.sharePostPage)
// router.get('/shares/:postId/edit', Controller.editSharePost)
// router.post('/shares/:postId/edit', Controller.editSharePost)
router.get('/shares/:postId/delete', Controller.deleteSharePost)
// router.post('/shares/:postId/edit', Controller.deleteSharePost)

// ======== profile ==========
router.get('/profile/:username', Controller.profile);
router.get('/profile/:username/edit', (req, res) => { res.render("profile/edit") });
// ===========


// router.post('/H8lumni/addShares',Controller.postAddShares)
// router.get('/H8lumni/shares/:postId', Controller.sharePostPage)


module.exports = router