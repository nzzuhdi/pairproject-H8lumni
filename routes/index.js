const router = require('express').Router()
const { sharesPage } = require('../controller/controller')
const Controller = require('../controller/controller')
const AuthController = require("../controller/authController");


/*
===== Auth ====
*/
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.get('/register', AuthController.getRegister);
router.post('/register', AuthController.postRegister);
// ==================================


router.get('/H8lumni', Controller.landingPage)

router.get('/H8lumni/home', Controller.homePage)

router.get('/H8lumni/profiles',Controller.profilePage)

router.get('/H8lumni/shares',Controller.sharesPage)

router.get('/H8lumni/shares/:postId', Controller.sharePostPage)

// router.get('/jobs', Controller.listJob)
// router.use('/jobs', jobRoute)
// router.use('/hiring', hirRoute)


module.exports = router