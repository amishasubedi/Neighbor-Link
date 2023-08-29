import React, { useState } from 'react';
import './PostItem.css';  

const PostItem = () => {
    const [postData, setPostData] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData); // send to firebase later (post)
    };

    return (
        <div className="post-container">
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} className="post-form">
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={postData.title} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="content">Content</label>
                    <textarea 
                        id="content" 
                        name="content" 
                        value={postData.content} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PostItem;
