import React, { useState, useEffect } from 'react';
import { ref,push, set,  onValue } from 'firebase/database';
import { database } from '../../dbConfig';

import './PostItem.css';  
import { useAuth } from '../Authentication/AuthContext';  

const PostItem = () => {
    const { currentUser } = useAuth();
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        userId: currentUser?.userId || null,
        username: currentUser?.name || null
    });

    console.log("Current user stored in context hook: " + currentUser.name) // milyo

    useEffect(() => {
        if (currentUser.name && currentUser.userId) {
            setPostData(prevData => ({ ...prevData, userId: currentUser.userId, username:currentUser.name }));
        }
    }, [currentUser]);
    
    

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    // send data to firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(currentUser)
        if (!currentUser.userId) {
            console.error('No user linked to this post');
            return;
        }
    
        console.log('Submitting post...');
        
        // Fetch the user's username based on userId from the users database
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            const user = Object.values(users).find((user) => user.userId === postData.userId);
    
            if (user) {
                console.log('User found:', user);
    
                try {
                    const postsRef = ref(database, 'posts');
                    const newPostRef = push(postsRef);
                
                    const newPostData = {
                        ...postData,
                        username: user.name // Add the username to the post data
                    };
                
                    set(newPostRef, newPostData);
                    console.log('Post sent to Firebase:', newPostData);
                    alert("Post Successfully created");
                    setPostData({ title: '', content: '', userId: postData.userId });
                } catch (error) {
                    console.error('Error sending post to Firebase:', error);
                }
                
            } else {
                console.error('User not found in database');
            }
        });
    };
    
    
    
    
    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} style={{ width: '90%', maxWidth: '1000px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>

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
