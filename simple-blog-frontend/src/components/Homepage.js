import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Homepage = ({ onSelectPost }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Blog Posts</h2>
            {posts.map(post => (
                <div key={post._id} onClick={() => onSelectPost(post)}>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default Homepage;
