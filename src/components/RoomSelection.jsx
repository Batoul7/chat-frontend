import { useState } from 'react';
import JoinModal from './JoinModal';

function RoomSelection({ rooms, onJoin }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleJoin = (name) => {
    onJoin(name, selectedRoom);
    setIsModalOpen(false);
  };

  return (
    <div className="room-selection-container">
      <h1>Choose a Chat Room</h1>
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room} className="room-card" onClick={() => handleRoomClick(room)}>
            <div className="room-icon">#</div>
            <div className="room-name">{room}</div>
          </div>
        ))}
      </div>
      
      {isModalOpen && (
        <JoinModal
          roomName={selectedRoom}
          onJoin={handleJoin}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default RoomSelection;
