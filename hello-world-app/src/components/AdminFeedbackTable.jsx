import React, { useState } from 'react';

const AdminFeedbackTable = ({ feedbacks, setFeedbacks }) => {
  // Функция для удаления отзыва
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/feedbacks/${id}`, { method: 'DELETE' });
    setFeedbacks(feedbacks.filter(fb => fb.id !== id));
  };

  // Функция для блокировки/разблокировки отзыва
  const handleBlock = async (id) => {
    const updatedFeedback = feedbacks.find(fb => fb.id === id);
    const updated = { ...updatedFeedback, isBlocked: !updatedFeedback.isBlocked };
    
    await fetch(`http://localhost:3000/feedbacks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });

    setFeedbacks(feedbacks.map(fb => fb.id === id ? updated : fb));
  };

  return (
    <div>
      <h3>Отзывы</h3>
      <table>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Отзыв</th>
            <th>Статус блокировки</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(fb => (
            <tr key={fb.id}>
              <td>{fb.username}</td>
              <td>{fb.feedback}</td>
              <td>{fb.isBlocked ? 'Заблокирован' : 'Активен'}</td>
              <td>
                <button onClick={() => handleBlock(fb.id)}>
                  {fb.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                </button>
                <button onClick={() => handleDelete(fb.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedbackTable;
