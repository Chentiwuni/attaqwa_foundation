const Question = require("../models/question");
const Message = require("../models/messages");
const asyncHandler = require("express-async-handler");

// GET: Display the form to ask a question
exports.getAskQuestion = asyncHandler(async (req, res) => {
  res.render("askQuestion", { title: "Ask Sheesu" });
});

exports.postAskQuestion = asyncHandler(async (req, res) => {
  const { question } = req.body;
  const userId = req.session.user?.id; // Retrieve user ID from session

  if (!question) {
    return res.status(400).render('askQuestion', {
      title: 'Ask Sheesu',
      error: 'Please provide a question.',
    });
  }

  await Question.create({ userId, question }); // Save question with associated user ID
  res.redirect('/attaqwa_foundation/ask_sheesu');
});

// GET: Display all questions (Admin view)
exports.getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate('userId', 'username phoneNumber') // Fetch only username and phone fields
    .sort({ createdAt: -1 });
  res.render("manageQuestions", { 
    title: "Manage Questions", 
    questions 
  });
});

// POST: Admin submits an answer to a question
exports.postAnswerQuestion = asyncHandler(async (req, res) => {
  const { questionId, answer } = req.body;

  // Find the question to get the associated userId
  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(404).send('Question not found.');
  }

  // Update the question with the answer
  question.answer = answer;
  question.isAnswered = true;
  await question.save();

  // Create a message for the associated user
  if (question.userId) {
    await Message.create({
      userId: question.userId,
      question: question.question,
      answer
    });
  }

  res.redirect('/attaqwa_foundation/manage_questions');
});

// Controller function to get a specific question by ID
exports.getQuestionDetails = asyncHandler(async (req, res) => {
    const questionId = req.params.id;
  
    // Find the question by ID
    const question = await Question.findById(questionId);
  
    if (!question) {
      return res.status(404).render('error', { message: "Question not found." });
    }
  
    // Render the question details page
    res.render('questionDetail', { question });
  });

  // GET: Display All Answered Questions
exports.getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({ isAnswered: true }).sort({ createdAt: -1 });

  res.render('allQuestions', { 
    title: "All Questions",
    questions
  });
});