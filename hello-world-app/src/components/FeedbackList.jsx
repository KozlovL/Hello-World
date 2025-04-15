// Компонент FeedbackList.jsx
import React from 'react';

const FeedbackList = ({ feedbacks, onDelete, onEdit }) => {
  return (
    <ul>
      {feedbacks.map((feedback) => (
        <li key={feedback.id}> {/* Убедитесь, что id уникально */}
          <p>{feedback.name}: {feedback.feedback}</p>
          <button onClick={() => onEdit(feedback)}>Редактировать</button>
          <button onClick={() => onDelete(feedback.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default FeedbackList;
