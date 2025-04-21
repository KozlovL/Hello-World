import React, { useEffect, useState } from 'react';

const ReadOnlyFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/feedbacks')
      .then(res => res.json())
      .then(setFeedbacks);
  }, []);

  return (
    <div>
      <h2>Отзывы пользователей</h2>
      <ul>
        {feedbacks.map(fb => (
          <li key={fb.id}>
            <strong>{fb.username}</strong>: {fb.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadOnlyFeedback;
