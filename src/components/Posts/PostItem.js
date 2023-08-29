import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../../dbConfig';

import './PostItem.css';  

const PostItem = () => {
    const [postData, setPostData] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    // send data to firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postsRef = ref(database, 'posts');
            await push(postsRef, postData);
            console.log('Post sent to Firebase:', postData);
            setPostData({ title: '', content: '' });
        } catch (error) {
            console.error('Error sending post to Firebase:', error);
        }
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
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default PostItem;