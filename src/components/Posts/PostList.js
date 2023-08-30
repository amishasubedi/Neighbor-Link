import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, get} from 'firebase/database';
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
    
                loadedPosts.push({
                    id: key,
                    title: postData.title,
                    content: postData.content,
                    username: postData.username
                });
            }
    
            console.log("Loaded post: " + loadedPosts[0])
            setPosts(loadedPosts);
        });
    }, []);

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


    
    return (
        <div className='post-list-container'>
            {posts.map(post => (
                <div key={post.id} className="post-item">
                    <h5 className="post-author">{post.name}</h5> {/* Display the author's name */}
                    <div className="profile-picture">
                        <img src={getRandomProfilePicture()} alt="Profile" />
                    </div>
                    <div className="post-content">
                        <h5 className='post-author'>{post.username}</h5>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-text">{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;



