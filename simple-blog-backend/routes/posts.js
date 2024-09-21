const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Adjust as needed

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    // Include summary in the new post
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        summary: req.body.summary, // Include the summary field
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).send('Post not found');
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
