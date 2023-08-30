import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const postRef = ref(db, 'posts');
        
        onValue(postRef, async (snapshot) => {
            const data = snapshot.val();
            const loadedPosts = [];
            
            for (let key in data) {
                const postData = data[key];
                
                // Fetch username based on userId
                const userRef = ref(db, `users/${postData.userId}`);
                const userSnapshot = await (await get(userRef)).val();
                const username = userSnapshot?.username || 'Anonymous'; // Default to 'Anonymous' if no user found
    
                loadedPosts.push({
                    id: key,
                    title: postData.title,
                    content: postData.content,
                    username: username
                });
            }
    
            setPosts(loadedPosts);
        });
    }, []);
    
    
    return (
        <div>
        {posts.map(post => (
            <div key={post.id} className="post-item">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <p>Posted by: {post.username}</p>
            </div>
        ))}
    </div>
    
    );
};

export default PostList;
