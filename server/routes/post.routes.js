const express = require('express');
const { createPost } = require('../controllers/postController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();


router.post('/addPost', authMiddleware , createPost );

module.exports = router;