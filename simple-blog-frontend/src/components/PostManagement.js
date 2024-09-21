import React from 'react';
import axios from 'axios';

const PostManagement = ({ posts, onPostChange }) => {
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/posts/${id}`);
        onPostChange(); // Refresh the list
    };

    return (
        <div>
            <h2>Manage Posts</h2>
            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostManagement;
