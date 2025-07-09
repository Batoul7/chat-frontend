import { useState, useEffect, useRef } from 'react';

function ChatWindow({ conversation, conversationId, username, onSendMessage, typingInfo, onTyping, onLogout, onReturnToRoom }) {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSend = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const isPrivateChat = conversationId && !conversationId.startsWith('#');
  
  let headerText = conversationId;
  if (isPrivateChat) {
    headerText = conversationId.split('-').find(name => name !== username) || 'Private Chat';
  }

  const typingStatus = typingInfo.isTyping ? `${typingInfo.user} is typing...` : `${conversation?.messages?.length || 0} messages`;

  return (
    <div className="chat-window">
      <div className="chat-header">
        {isPrivateChat && (
          <button onClick={onReturnToRoom} className="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        )}
        <div className="chat-header-info">
          <h3>{headerText}</h3>
          <span>{typingStatus}</span>
        </div>
        <button onClick={onLogout} className="logout-button">Leave</button>
      </div>

      <div className="messages">
        {conversation?.messages?.map((msg, i) => {
          const senderName = msg.user || msg.sender;
          
          const isMyMessage = senderName === username;

          return (
            <div key={i} className={`message ${isMyMessage ? 'my-message' : 'other-message'}`}>
              <div className="message-bubble">
                {!isMyMessage && <strong className="message-sender">{senderName}</strong>}
                <p className="message-text">{msg.text}</p>
                <span className="message-timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
            onTyping();
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Message ${headerText}`}
        />
        <button className="send-button" onClick={handleSend}>
       <svg viewBox="0 0 24 24" width="32" height="32">
        <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
      </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;