const index_controller = require("../controllers/index");
const userAccount = require("../controllers/userAccount");
const adminAccount = require('../controllers/adminAccount');
const videoCategoryController = require('../controllers/videoCategoryController');
const questionController = require("../controllers/question");
const sessionSignOut = require("../controllers/signOut");
const { validateUserSignUp } = require("../middleware/userValidation");
const { validateAdminSignUp } = require("../middleware/adminValidation");
const getAllQuestion = require("../controllers/question");
const addVideoController = require("../controllers/addVideo");
const videoListController = require("../controllers/videoList");
const isAuthenticated = require("../middleware/userSessionAuth");
const isAdmin = require("../middleware/adminSessionAuth");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", index_controller.index);

router.get('/add_video_category',isAdmin, videoCategoryController.getAddCategory);

router.post('/add_video_category',isAdmin, videoCategoryController.postAddCategory);

router.get('/video_categories/:id', videoListController.getVideoList);

// GET: Render add video form
router.get('/add_video', addVideoController.getAddVideo);

// POST: Handle video form submission
router.post('/add_video', addVideoController.postAddVideo);


// GET: Display the sign-in page
router.get('/signin', adminAccount.getSignInPage);

// POST: Handle user sign-in
router.post('/signin/user', userAccount.postUserSignIn);

// POST: Handle admin sign-in
router.post('/signin/admin', adminAccount.postAdminSignIn);

// User Sign-Up Routes
router.get('/signup', userAccount.getUserSignUp);

router.post('/signup',validateUserSignUp, userAccount.postUserSignUp);

router.get('/user_signup_success', userAccount.getUserSignUpSuccess);

router.get('/user_messages', userAccount.getUserMessages);

router.get('/admin_signup_success', adminAccount.getAdminSignUpSuccess);

// Admin Sign-Up Routes
router.get('/signup/admin', isAdmin, adminAccount.getAdminSignUp); 

router.post('/signup/admin',validateAdminSignUp,isAdmin, adminAccount.postAdminSignUp);

// GET: Admin Dashboard
router.get('/dashboard',isAdmin, adminAccount.getAdminDashboard);


router.get('/signout', sessionSignOut.signOut);

// Question Routes
router.get("/ask_sheesu",isAuthenticated, questionController.getAskQuestion);
router.post("/ask_sheesu",isAuthenticated, questionController.postAskQuestion);

// Admin routes
router.get("/manage_questions",isAdmin, questionController.getQuestions);
router.post("/answer_question",isAdmin, questionController.postAnswerQuestion);

// Route to get question details by ID
router.get('/all_questions', questionController.getAllQuestions);

// Route to get question details by ID
router.get('/question/:id', questionController.getQuestionDetails);

module.exports = router;