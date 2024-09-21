import React, { useState } from 'react';
import axios from 'axios';

const CreateEditPost = ({ post, onUpdate, onCreate }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');
    const [summary, setSummary] = useState(post ? post.summary : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (post) {
            // Update post
            await axios.put(`http://localhost:5000/api/posts/${post._id}`, { title, content, summary });
            onUpdate();
        } else {
            // Create new post
            await axios.post('http://localhost:5000/api/posts', { title, content, summary });
            onCreate();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
            <button type="submit">{post ? 'Update' : 'Create'} Post</button>
        </form>
    );
};

export default CreateEditPost;
