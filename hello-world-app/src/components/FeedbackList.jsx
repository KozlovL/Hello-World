import React from 'react';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div>
      <h2>Список отзывов</h2>
      <ul>
        {feedbacks.map((feedback, index) => (
          <li key={index}>
            <strong>{feedback.name}:</strong> {feedback.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;