import React from 'react';

const PostPage = ({ post }) => {
    if (!post) return <div>Select a post to view.</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
};

export default PostPage;
