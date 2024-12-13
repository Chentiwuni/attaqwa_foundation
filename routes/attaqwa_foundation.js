const index_controller = require("../controllers/index");
const authController = require('../controllers/authController');
const videoCategoryController = require('../controllers/videoCategoryController');
const questionController = require("../controllers/question");
const isAuthenticated = require("../middleware/userAuthentication");
const isAdmin = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", index_controller.index);

router.get('/add_video_category',isAdmin, videoCategoryController.getAddCategory);

router.post('/add_video_category',isAdmin, videoCategoryController.postAddCategory);

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
router.get('/signup/admin',isAdmin, authController.getAdminSignUp); 

router.post('/signup/admin',isAdmin, authController.postAdminSignUp);

// GET: Admin Dashboard
router.get('/dashboard',isAdmin, authController.getAdminDashboard);


router.get('/signout', authController.signOut);

// User routes
router.get("/ask_sheesu",isAuthenticated, questionController.getAskQuestion);
router.post("/ask_sheesu",isAuthenticated, questionController.postAskQuestion);

// Admin routes
router.get("/manage_questions",isAdmin, questionController.getQuestions);
router.post("/answer_question",isAdmin, questionController.postAnswerQuestion);

// Route to get question details by ID
router.get('/question/:id', questionController.getQuestionDetails);

module.exports = router;