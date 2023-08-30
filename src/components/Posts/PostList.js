import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update, get} from 'firebase/database';
import './PostList.css';
import { useAuth } from '../Authentication/AuthContext';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const {currentUser} = useAuth();
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const postRef = ref(db, 'posts');
        
        onValue(postRef, async (snapshot) => {
            const data = snapshot.val();
            const loadedPosts = [];
            
            for (let key in data) {
                const postData = data[key];
    
                loadedPosts.push({
                    id: key,
                    title: postData.title,
                    content: postData.content,
                    username: postData.username,
                    likes: postData.likes
                });
            }
    
            console.log("Loaded post: " + loadedPosts[0])
            setPosts(loadedPosts);
        });
    }, []);

    // Load liked posts for the current user
    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const userLikesRef = ref(db, `users/${currentUser.userId}/likes`);
            
            onValue(userLikesRef, (snapshot) => {
                const likedPostsData = snapshot.val();
                const likedPostsList = likedPostsData ? Object.keys(likedPostsData) : [];
                setLikedPosts(likedPostsList);
            });
        }
    }, [currentUser]);

    // store in AWS S3 later or cloudinary for now using random profile pic url
    const getRandomProfilePicture = () => {
        const profilePictures = [
            'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg',
            'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
            'https://marketplace.canva.com/EAFfyNv3EC4/2/0/1600w/canva-orange-black-modern-facebook-profile-picture-17RW-gVJo5k.jpg',
        ];

        const randomIndex = Math.floor(Math.random() * profilePictures.length);
        return profilePictures[randomIndex];
    };

    const handleLike = async (event, postId) => {
        event.preventDefault();
        const db = getDatabase();
        const postRef = ref(db, `posts/${postId}`);
        const currentUserRef = ref(db, `users/${currentUser.userId}`);
    
        try {
            if (!likedPosts.includes(postId)) {
                // Fetch the current likes count of the post
                const postSnapshot = await get(postRef);
                const currentLikes = postSnapshot.val().likes || 0;
        
                // Update the likes count in the database
                await update(postRef, {
                    likes: currentLikes + 1
                });
        
                // Update the user's trust score by 2 points
                const currentUserSnapshot = await get(currentUserRef);
                const currentTrustScore = currentUserSnapshot.val().trustScore || 0;
        
                await update(currentUserRef, {
                    trustScore: currentTrustScore + 2
                });
        
                // Update likedPosts state
                setLikedPosts([...likedPosts, postId]);
        
                // Fetch the updated posts data
                const updatedPosts = posts.map(post => {
                    if (post.id === postId) {
                        return { ...post, likes: currentLikes + 1 };
                    }
                    return post;
                });
        
                setPosts(updatedPosts);
            }
        } catch (error) {
            console.error('Error updating likes and trust score:', error);
        }
    };
    
    
    
    return (
        <div className='post-list-container'>
            {posts.map(post => (
                <div key={post.id} className="post-item">
                    <h5 className="post-author">{post.name}</h5>
                    <div className="profile-picture">
                        <img src={getRandomProfilePicture()} alt="Profile" />
                    </div>
                    <div className="post-content">
                        <h5 className='post-author'>{post.username}</h5>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-text">{post.content}</p>
                        <div className="post-likes">
                        <span>{post.likes || 0} likes</span>
                        <button onClick={() => handleLike(post.id)}>
                            {likedPosts.includes(post.id) ? 'Unlike' : 'Like'}
                        </button>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    );
    
};

export default PostList;



