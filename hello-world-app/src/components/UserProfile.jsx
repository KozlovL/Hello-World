import React from 'react';

const UserProfile = ({ username, onLogout }) => {
  return (
    <div style={{ textAlign: 'right', padding: '10px' }}>
      <span>Пользователь: {username}</span>
      <button onClick={onLogout} style={{ marginLeft: '10px' }}>Выйти</button>
    </div>
  );
};

export default UserProfile;