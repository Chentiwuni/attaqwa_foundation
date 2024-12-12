const Question = require("../models/question");
const asyncHandler = require("express-async-handler");

// GET: Display the form to ask a question
exports.getAskQuestion = asyncHandler(async (req, res) => {
  res.render("askQuestion", { title: "Ask Sheesu" });
});

// POST: Submit a question
exports.postAskQuestion = asyncHandler(async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).render("askQuestion", {
      title: "Ask Sheesu",
      error: "Please provide a question.",
    });
  }
  await Question.create({ question });
  res.redirect("/attaqwa_foundation/ask_sheesu");
});

// GET: Display all questions (Admin view)
exports.getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.render("manageQuestions", { title: "Manage Questions", questions });
});

// POST: Submit an answer to a question (Admin view)
exports.postAnswerQuestion = asyncHandler(async (req, res) => {
  const { questionId, answer } = req.body;
  await Question.findByIdAndUpdate(questionId, {
    answer,
    isAnswered: true,
  });
  res.redirect("/attaqwa_foundation/manage_questions");
});
