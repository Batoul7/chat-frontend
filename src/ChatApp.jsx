


// import { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://127.0.0.1:4000');

// function ChatApp() {
//     const [username, setUsername] = useState('');
//     const [go, setGo] = useState(false);
//     const [room, setRoom] = useState('general');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [isTyping, setIsTyping] = useState('');
//     const [recipient, setRecipient] = useState('');

//     useEffect(() => {
//         socket.on('message', (msg) => {
//             setMessages(prev => [...prev, msg]);
//         });
        
//         socket.on('privateMessage', (msg) => {
//             setMessages(prev => [...prev, {...msg, isPrivate: true}]);
//         });
        
//         socket.on('users', (usersList) => {
//             setUsers(usersList);
//         });
        
//         socket.on('typing', (username) => {
//             setIsTyping(`${username} is typing...`);
//             setTimeout(() => setIsTyping(''), 2000);
//         });
    
//         return () => {
//             socket.off();
//         };
//     }, []);

//     const joinRoom = () => {
//         if (username && room) {
//             socket.emit('join', { username, room });
//             setGo(true)
//         }
//     };

//     const sendMessage = () => {
//         if (message.trim() && recipient) {
//         socket.emit('privateMessage', { 
//             recipient, 
//             text: message 
//         });
//         setMessage('');
//         } else if (message.trim()) {
//             socket.emit('sendMessage', message);
//             setMessage('');
//         }
//     };

//     return (
//         <div className="chat-container">
//         {!go ? (
//             <div className="login">
//             <input 
//                 type="text" 
//                 placeholder="Enter username" 
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <select onChange={(e) => setRoom(e.target.value)}>
//                 <option value="general">General</option>
//                 <option value="tech">Tech</option>
//                 <option value="gaming">Gaming</option>
//             </select>
//             <button onClick={joinRoom}>Join Chat</button>
//             </div>
//         ) : (
//             <div className="chat-room">
//             <div className="sidebar">
//                 <h3>Room: {room}</h3>
//                 <h4>Users:</h4>
//                 <ul>
//                 {users.map((user, i) => (
//                     <li key={i} onClick={() => setRecipient(user)}>
//                     {user} {recipient === user && '✓'}
//                     </li>
//                 ))}
//                 </ul>
//             </div>
            
//             <div className="chat-main">
//                 <div className="messages">
//                 {messages.map((msg, i) => (
//                     <div key={i} className={msg.isPrivate ? 'private' : ''}>
//                     <strong>{msg.user}: </strong>
//                     {msg.text} -
//                     <span className="timestamp">
//                         {" " + new Date(msg.timestamp).toLocaleTimeString()}
//                     </span>
//                     </div>
//                 ))}
//                 {isTyping && <div className="typing">{isTyping}</div>}
//                 </div>
                
//                 <div className="input-area">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => {
//                     setMessage(e.target.value);
//                     socket.emit('typing');
//                     }}
//                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                     placeholder={recipient 
//                     ? `Private to ${recipient}` 
//                     : `Message in ${room}`}
//                 />
//                 <button onClick={sendMessage}>Send</button>
//                 </div>
//             </div>
//             </div>
//         )}
//         </div>
//     );
// }

// export default ChatApp;