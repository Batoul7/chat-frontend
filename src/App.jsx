import { useState } from 'react';
import ChatPage from './components/ChatPage';
import RoomSelection from './components/RoomSelection';
import './App.css';

const AVAILABLE_ROOMS = ['Web Development', 'Tech with Batoul', 'Supervisors','General Chat'];

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (name, room) => {
    if (name.trim() && room) {
      setUser({ name, room });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      {user ? (
        <ChatPage
          username={user.name}
          initialRoom={user.room}
          availableRooms={AVAILABLE_ROOMS}
          onLogout={handleLogout}
        />
      ) : (
        <RoomSelection
          rooms={AVAILABLE_ROOMS}
          onJoin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;