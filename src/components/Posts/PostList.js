import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postRef = ref(getDatabase(), 'posts'); 
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            const loadedPosts = [];
            for (let key in data) {
                loadedPosts.push({
                    id: key,
                    title: data[key].title,
                    content: data[key].content
                });
            }
            setPosts(loadedPosts);
        });
    }, []);

    return (
        <div className="place-list">
            {posts.map(post => (
                <div key={post.id} className="post-item">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content">{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
