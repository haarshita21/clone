const express = require('express');
const { getPosts, createPost, likePost, savePost } = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, likePost);
router.post('/:id/save', protect, savePost);

module.exports = router;