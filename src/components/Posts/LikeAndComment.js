import React from 'react';
import { getDatabase, ref, update, get } from 'firebase/database';
import './PostList.css';
import { useNavigate } from 'react-router-dom';

const LikeAndComment = ({ post, currentUser, likedPosts, setLikedPosts, posts, setPosts, navigate }) => {
    navigate = useNavigate();
    const handleLike = async (event, postId) => {
        if (!currentUser) {
            navigate('/login');
            return; // Return early if user is not logged in
        }
    
        const db = getDatabase();
        const postRef = ref(db, `posts/${postId}`);
        const currentUserRef = ref(db, `users/${currentUser.userId}`);
        
        try {
            const postSnapshot = await get(postRef);
            const currentLikes = postSnapshot.val().likes || 0;
    
            if (!likedPosts.includes(postId)) {
                await update(postRef, { likes: currentLikes + 1 });
                const currentUserSnapshot = await get(currentUserRef);
    
                if (currentUserSnapshot.exists()) {
                    const currentTrustScore = currentUserSnapshot.val().trustScore || 0;
                    await update(currentUserRef, { trustScore: currentTrustScore + 2 });
                }
                setLikedPosts([...likedPosts, postId]);
            } else {
                await update(postRef, { likes: currentLikes - 1 });
                const currentUserSnapshot = await get(currentUserRef);
    
                if (currentUserSnapshot.exists()) {
                    const currentTrustScore = currentUserSnapshot.val().trustScore || 0;
                    await update(currentUserRef, { trustScore: currentTrustScore - 2 });
                }
                setLikedPosts(likedPosts.filter(id => id !== postId));
            }
    
            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return { ...post, likes: currentLikes + (likedPosts.includes(postId) ? -1 : 1) };
                }
                return post;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error updating likes and trust score:', error);
        }
    };

    return (
        <div className='post-engage'>
            <div className="post-likes">
                <span>{post.likes || 0} likes</span>
                <button type="button" onClick={(event) => handleLike(event, post.id)}>
                    {likedPosts.includes(post.id) ? 'Unlike' : 'Like'}
                </button>
            </div>
            <div className='wrapper'>
                <div className="write-comment">
                    <input type="text" placeholder="Write a comment..." />
                    <button type="button">Post Comment</button>
                </div>
            </div>
        </div>
    );
};

export default LikeAndComment;
