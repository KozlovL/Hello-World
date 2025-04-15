import React from 'react';

const FeedbackList = ({ feedbacks, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Список отзывов</h2>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <strong>{feedback.name}:</strong> {feedback.feedback}
            <button onClick={() => onEdit(feedback)}>✏️ Изменить</button>
            <button onClick={() => onDelete(feedback.id)}>🗑 Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
