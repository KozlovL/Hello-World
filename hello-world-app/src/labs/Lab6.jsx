// src/components/Lab6.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks, addFeedback, updateFeedback, deleteFeedback } from '../redux/feedbackSlice';
import useLoginState from '../hooks/useLoginState';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

const Lab6 = () => {
  const { username } = useLoginState();
  const dispatch = useDispatch();

  // Получаем данные из состояния Redux
  const feedbacks = useSelector((state) => state.feedback.feedbacks);
  const loading = useSelector((state) => state.feedback.loading);
  const error = useSelector((state) => state.feedback.error);

  const [editingFeedback, setEditingFeedback] = React.useState(null); // Для редактирования отзыва

  useEffect(() => {
    dispatch(fetchFeedbacks());  // Загружаем отзывы при монтировании компонента
  }, [dispatch]);

  const handleAddFeedback = (data) => {
    if (editingFeedback) {
      // Обновление отзыва
      dispatch(updateFeedback({ id: editingFeedback.id, feedback: data.feedback }));
      setEditingFeedback(null);
    } else {
      // Добавление нового отзыва
      dispatch(addFeedback({ name: username || 'Anonymous', feedback: data.feedback }));
    }
  };

  const handleDeleteFeedback = (id) => {
    dispatch(deleteFeedback(id));  // Удаляем отзыв
  };

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);  // Устанавливаем редактируемый отзыв
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Лабораторная работа 6</h1>
      <FeedbackForm onSubmit={handleAddFeedback} initialData={editingFeedback} />
      <FeedbackList
        feedbacks={feedbacks}
        onDelete={handleDeleteFeedback}
        onEdit={handleEditFeedback}
      />
    </div>
  );
};

export default Lab6;
