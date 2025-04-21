import React from 'react';

const UserTable = ({ users, setUsers }) => {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter(user => user.id !== id));
  };

  const toggleBlock = async (user) => {
    const updated = { ...user, isBlocked: !user.isBlocked };
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setUsers(users.map(u => u.id === user.id ? updated : u));
  };

  return (
    <div>
      <h3>Пользователи</h3>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Роль</th>
            <th>Блок</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role || 'user'}</td>
              <td>{user.isBlocked ? 'Заблокирован' : 'Активен'}</td>
              <td>
                <button onClick={() => toggleBlock(user)}>
                  {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                </button>
                <button onClick={() => handleDelete(user.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
