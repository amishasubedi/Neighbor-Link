import React, {useState} from 'react';
import { getDatabase, ref, update, get } from 'firebase/database';
import './PostList.css';
import { useNavigate } from 'react-router-dom';
import { database } from '../../dbConfig';
//import { useAuth } from '../Authentication/AuthContext';

const LikeAndComment = ({ post, currentUser, setCurrentUser, likedPosts, setLikedPosts, posts, setPosts, navigate }) => {
    navigate = useNavigate();
    const [postData] = useState({
        userId: currentUser?.userId || null,
        username: currentUser?.name || null
    });

    // Function to handle the like action for a post
    const handleLike = async (event, postId) => {

        event.preventDefault();

        // If user is not logged in, navigate them to the login page
        if (!currentUser) {
            navigate('/login');
            return; // Return early if user is not logged in
        }
    
        const db = getDatabase();
        const postRef = ref(db, `posts/${postId}`);
        const currentUserRef = ref(db, `users/${currentUser.userId}`);
        
        try {
            // Fetch current post data
            const postSnapshot = await get(postRef);
            const currentLikes = postSnapshot.val().likes || 0;
    
            // If post is not already liked by user
            if (!likedPosts.includes(postId)) {
                await update(postRef, { likes: currentLikes + 1 });
                const currentUserSnapshot = await get(currentUserRef);
    
                // Fetch current user data
                if (currentUserSnapshot.exists()) {
                    // Update the user's trust score in the database
                    const currentUserRef = ref(database, `users/${postData.userId}`);
                    const newTrustScore = currentUser.trustScore + 2;
                
                    try {
                        update(currentUserRef, { trustScore: newTrustScore });
                
                        // Update the trustScore property in the currentUser state
                        setCurrentUser(prevUser => ({ ...prevUser, trustScore: newTrustScore }));
                        alert('Congratulations, You earned 2 points');
                    } catch (error) {
                        console.error('Error sending post to Firebase:', error);
                    }
                }
                setLikedPosts([...likedPosts, postId]);
            } else {
                await update(postRef, { likes: currentLikes - 1 });
                const currentUserSnapshot = await get(currentUserRef);
    
                if (currentUserSnapshot.exists()) {
                    const currentTrustScore = currentUserSnapshot.val().trustScore || 0;
                    await update(currentUserRef, { trustScore: currentTrustScore - 2 });
                }

                // Update the local state to remove post from liked posts
                setLikedPosts(likedPosts.filter(id => id !== postId));
            }
    
            // Update the posts list with the new likes count
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
