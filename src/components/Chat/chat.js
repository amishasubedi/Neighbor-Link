import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        
        // Add the message to the chat log
        setChatLog([...chatLog, { sender: 'You', message }]);
        
        // Reset the input
        setMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-log">
                {chatLog.map((entry, index) => (
                    <div key={index} className="chat-entry">
                        <strong>{entry.sender}</strong>: {entry.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input 
                    type="text" 
                    value={message} 
                    onChange={handleInputChange} 
                    placeholder="Type your message..." 
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
