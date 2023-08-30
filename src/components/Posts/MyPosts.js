import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import './MyPosts.css';
import { useAuth } from '../Authentication/AuthContext';

const MyPosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const db = getDatabase();
        const postRef = ref(db, 'posts');

        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            const userPosts = [];

            for (let key in data) {
                const postData = data[key];

                if (postData.userId === currentUser.userId) {
                    userPosts.push({
                        id: key,
                        title: postData.title,
                        content: postData.content,
                        likes: postData.likes || 0,
                    });
                }
            }

            setUserPosts(userPosts);
        });
    }, [currentUser]);

    const handleDelete = (postId) => {
        // Delete the post logic here
    };

    return (
        <div className="post-list-container">
            {userPosts.length > 0 ? (
                userPosts.map((post) => (
                    <div key={post.id} className="post-item">
                        <div className="post-content">
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-text">{post.content}</p>
                            <div className="post-likes">
                                <span>{post.likes} likes</span>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-posts-message">You don't have any posts yet.</p>
            )}
        </div>
    );
};

export default MyPosts;
