const index_controller = require("../controllers/index");
const authController = require('../controllers/authController');
const videoCategoryController = require('../controllers/videoCategoryController');
const questionController = require("../controllers/question");
const express = require("express");
const router = express.Router();
const { isUserAuthenticated } = require('../middleware/authMiddleware');

/* GET home page. */
router.get("/", index_controller.index);

router.get('/add_video_category', videoCategoryController.getAddCategory);

router.post('/add_video_category', videoCategoryController.postAddCategory);

// GET: Display the sign-in page
router.get('/signin/user', authController.getSignInPage);

// POST: Handle user sign-in
router.post('/signin/user', authController.postUserSignIn);

// POST: Handle admin sign-in
router.post('/signin/admin', authController.postAdminSignIn);

// User Sign-Up Routes
router.get('/signup', authController.getUserSignUp);

router.post('/signup', authController.postUserSignUp);

// Admin Sign-Up Routes
router.get('/signup/admin', authController.getAdminSignUp); 

router.post('/signup/admin', authController.postAdminSignUp);

// GET: Admin Dashboard
router.get('/dashboard', authController.getAdminDashboard);


router.get('/signout', authController.signOut);

// User routes
router.get("/ask_sheesu", questionController.getAskQuestion);
router.post("/ask_sheesu", questionController.postAskQuestion);

// Admin routes
router.get("/manage_questions", questionController.getQuestions);
router.post("/answer_question", questionController.postAnswerQuestion);

module.exports = router;