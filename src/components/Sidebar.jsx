function Sidebar({ availableRooms, currentRoom, users, currentUser, onSwitchRoom, onSelectConversation, activeConversationId, getPrivateId }) {
  return (
    <div className="sidebar">
      {/* القسم الأول: المستخدمون في الغرفة الحالية */}
      <div className="sidebar-section">
        <h3>Users in <span>{currentRoom}</span></h3>
        <ul>
          {/* العودة للمحادثة العامة لهذه الغرفة */}
          <li
            onClick={() => onSelectConversation(`#${currentRoom}`)}
            className={activeConversationId === `#${currentRoom}` ? 'active' : ''}
          >
            <div className="room-icon-sidebar"></div> {currentRoom} (Public)
          </li>
          {/* قائمة المستخدمين لبدء محادثات خاصة */}
          {users.filter(u => u !== currentUser).map((user, i) => {
            const privateId = getPrivateId(currentUser, user);
            return (
              <li
                key={i}
                onClick={() => onSelectConversation(privateId)}
                className={activeConversationId === privateId ? 'active' : ''}
              >
                {user}
              </li>
            );
          })}
        </ul>
      </div>

      {/* القسم الثاني: الغرف الأخرى المتاحة */}
      <div className="sidebar-section">
        <h3>Other Rooms</h3>
        <ul>
          {availableRooms.filter(r => r !== currentRoom).map((room) => (
            <li key={room} onClick={() => onSwitchRoom(room)} className="switch-room">
             <div className="room-icon-sidebar"></div> {room}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
