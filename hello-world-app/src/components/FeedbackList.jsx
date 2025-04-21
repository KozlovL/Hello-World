const FeedbackList = ({ feedbacks, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Отзывы</h2>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <strong>{feedback.name || feedback.username || 'Anonymous'}</strong>: {feedback.feedback}
            <button onClick={() => onEdit(feedback)}>Редактировать</button>
            <button onClick={() => onDelete(feedback.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
