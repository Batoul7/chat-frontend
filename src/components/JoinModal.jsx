import { useState } from 'react';

function JoinModal({ roomName, onJoin, onClose }) {
  const [name, setName] = useState('');

  const handleJoinClick = () => {
    if (name.trim()) {
      onJoin(name);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Enter your name to join #{roomName}</h2>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleJoinClick()}
          autoFocus
        />
        <button className="join-button" onClick={handleJoinClick}>Join</button>
      </div>
    </div>
  );
}

export default JoinModal;
