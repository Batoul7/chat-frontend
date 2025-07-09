import { useState } from 'react';

function JoinScreen({ onLogin }) {
  const [name, setName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('general'); 

  const handleJoin = () => {
    onLogin(name, selectedRoom);
  };

  return (
    <div className="join-screen">
      <h2>Join a Chat Room</h2>
      <input 
        type="text" 
        placeholder="Enter your username" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
      />
      <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value="general">General</option>
          <option value="tech">Tech</option>
          <option value="gaming">Gaming</option>
      </select>
      <button onClick={handleJoin}>Join Chat</button>
    </div>
  );
}

export default JoinScreen;
