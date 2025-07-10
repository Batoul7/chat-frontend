import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const socket = io('https://chat-backend-e7kx.onrender.com');

const getPrivateConversationId = (user1, user2) => {
  return [user1, user2].sort().join('-');
};

function ChatPage({ username, initialRoom, availableRooms, onLogout }) {
  const [currentRoom, setCurrentRoom] = useState(initialRoom);
  const [conversations, setConversations] = useState({});
  const [activeConversationId, setActiveConversationId] = useState(`#${initialRoom}`);
  const [users, setUsers] = useState([]);
  const [typingInfo, setTypingInfo] = useState({ isTyping: false, user: '' });


  const switchRoom = (roomToJoin) => {
    if (roomToJoin === currentRoom) {
      setActiveConversationId(`#${roomToJoin}`);
      return;
    }
    socket.emit('join', { username, room: roomToJoin });
    setCurrentRoom(roomToJoin);
    setActiveConversationId(`#${roomToJoin}`); 
    setUsers([]); 
  };
  
  useEffect(() => {
    socket.connect();

    if (socket.disconnected) {
        socket.emit('join', { username, room: currentRoom });
    }

    const handlePreviousMessages = (messages) => {
      setConversations(prev => ({ ...prev, [`#${currentRoom}`]: { messages, type: 'room' } }));
    };
    const handleNewMessage = (msg) => {
      const roomID = `#${msg.room}`;
      setConversations(prev => ({
        ...prev,
        [roomID]: { ...prev[roomID], messages: [...(prev[roomID]?.messages || []), msg] }
      }));
    };
    const handlePrivateMessage = (msg) => {
      const conversationId = getPrivateConversationId(msg.sender, username);
      setConversations(prev => ({
        ...prev,
        [conversationId]: { type: 'private', messages: [...(prev[conversationId]?.messages || []), msg] }
      }));
    };
    const handleUsersList = (usersList) => setUsers([...new Set(usersList)]);
    const handleTyping = (typingUser) => {
      if (typingUser !== username) {
        setTypingInfo({ isTyping: true, user: typingUser });
        setTimeout(() => setTypingInfo({ isTyping: false, user: '' }), 3000);
      }
    };

    socket.on('previousMessages', handlePreviousMessages);
    socket.on('message', handleNewMessage);
    socket.on('privateMessage', handlePrivateMessage);
    socket.on('users', handleUsersList);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('previousMessages');
      socket.off('message');
      socket.off('privateMessage');
      socket.off('users');
      socket.off('typing');
    };
  }, [username, currentRoom]); 

  const handleSendMessage = (text) => {
    const conversation = conversations[activeConversationId];
    if (!text.trim() || !conversation) return;

    if (conversation.type === 'private') {
      const recipient = activeConversationId.replace(username, '').replace('-', '');
      socket.emit('privateMessage', { recipient, text });
      const ownMsg = { text, sender: username, timestamp: Date.now(), isPrivate: true };
      setConversations(prev => ({
        ...prev,
        [activeConversationId]: { ...prev[activeConversationId], messages: [...(prev[activeConversationId]?.messages || []), ownMsg] }
      }));
    } else {
      socket.emit('sendMessage', text);
    }
  };
  
  const selectConversation = (id) => {
    if (!conversations[id]) {
      setConversations(prev => ({ ...prev, [id]: { messages: [], type: 'private' } }));
    }
    setActiveConversationId(id);
  };

  const handleLeave = () => {
      socket.disconnect();
      onLogout();
  }

  return (
    <div className="chat-container">
      <Sidebar
        availableRooms={availableRooms}
        currentRoom={currentRoom}
        users={users}
        currentUser={username}
        onSwitchRoom={switchRoom}
        onSelectConversation={selectConversation}
        activeConversationId={activeConversationId}
        getPrivateId={getPrivateConversationId}
      />
      <ChatWindow
        conversation={conversations[activeConversationId]}
        conversationId={activeConversationId}
        username={username}
        onSendMessage={handleSendMessage}
        typingInfo={typingInfo}
        onTyping={() => socket.emit('typing')}
        onLogout={handleLeave}
        onReturnToRoom={() => setActiveConversationId(`#${currentRoom}`)}
      />
    </div>
  );
}

export default ChatPage;
