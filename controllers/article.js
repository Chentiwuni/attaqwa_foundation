const asyncHandler = require('express-async-handler');
const Article = require('../models/article');
const sanitizeHtml = require('sanitize-html');

// GET: Form to Create Article (Admin only)
exports.getCreateArticle = asyncHandler(async (req, res) => {
  res.render('admin_create_article'); // Render the form view
});

// POST: Save Article to Database (Admin only)
exports.postCreateArticle = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'p', 'strong', 'em', 'ul', 'li']),
    allowedAttributes: false,
  });

  await Article.create({ title, content: sanitizedContent });

  res.redirect('/');
});
// GET: View a Specific Article
exports.getArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id); // Find article by ID

  if (!article) {
    res.status(404).send("Article Not Found");
    return;
  }

  res.render('article', { article }); // Render article view
});

// GET: View All Articles
exports.getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 }); // Get all articles sorted by creation date
  res.render('all_articles', { articles }); // Render the view listing all articles
});
