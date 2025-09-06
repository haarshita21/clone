const Post = require('../models/Post');

// Get all posts with filters
const getPosts = async (req, res) => {
  try {
    const { filter, category } = req.query;
    let query = {};
    
    // Apply category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    let posts = await Post.find(query)
      .populate('author', 'name username avatar')
      .sort({ createdAt: -1 });
    
    // Apply user-specific filters
    if (filter === 'liked') {
      posts = posts.filter(post => 
        post.likes.some(like => like.toString() === req.user.id)
      );
    } else if (filter === 'saved') {
      posts = posts.filter(post => 
        post.savedBy.some(user => user.toString() === req.user.id)
      );
    }
    
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, type, category, media } = req.body;
    
    const post = await Post.create({
      title,
      content,
      type,
      category,
      media,
      author: req.user.id
    });
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name username avatar');
    
    res.status(201).json({ post: populatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if the post has already been liked
    const alreadyLiked = post.likes.some(
      like => like.toString() === req.user.id
    );
    
    if (alreadyLiked) {
      // Unlike the post
      post.likes = post.likes.filter(
        like => like.toString() !== req.user.id
      );
    } else {
      // Like the post
      post.likes.push(req.user.id);
    }
    
    await post.save();
    
    res.json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save a post
const savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if the post has already been saved
    const alreadySaved = post.savedBy.some(
      user => user.toString() === req.user.id
    );
    
    if (alreadySaved) {
      // Remove from saved
      post.savedBy = post.savedBy.filter(
        user => user.toString() !== req.user.id
      );
    } else {
      // Add to saved
      post.savedBy.push(req.user.id);
    }
    
    await post.save();
    
    res.json({ message: alreadySaved ? 'Post removed from saved' : 'Post saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  likePost,
  savePost
};