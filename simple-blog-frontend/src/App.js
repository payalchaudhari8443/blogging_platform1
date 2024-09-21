import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

   const createPost = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/posts', { title, content, summary });
        console.log("Post created:", response.data);
        fetchPosts(); // Refresh the post list
        setTitle(''); // Clear title input
        setSummary(''); // Clear summary input
        setContent(''); // Clear content input
    } catch (error) {
        console.error("Error creating post:", error.response ? error.response.data : error.message);
    }
};



    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Blogging Platform</h1>
            <div>
                <h2>Create a New Post</h2>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Summary" 
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value)} 
                />
                <textarea 
                    placeholder="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                ></textarea>
                <button onClick={createPost}>Submit</button>
            </div>
            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default App;
