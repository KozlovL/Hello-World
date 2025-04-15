import React, { useState, useEffect } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

const Lab6 = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);

  // Получение отзывов
  useEffect(() => {
    fetch('http://localhost:3000/feedbacks')
      .then((res) => res.json())
      .then((data) => {
        // Убираем дублирующиеся отзывы (если они есть)
        const uniqueFeedbacks = Array.from(new Set(data.map(a => a.id)))
          .map(id => {
            return data.find(a => a.id === id)
          });
        setFeedbacks(uniqueFeedbacks);
      });
  }, []); // Зависимость пустая, значит запрос выполняется только один раз

  // Добавление или обновление отзыва
  const handleAddFeedback = (data) => {
    if (editingFeedback) {
      // Редактирование
      fetch(`http://localhost:3000/feedbacks/${editingFeedback.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingFeedback, feedback: data.feedback }),
      })
        .then((res) => res.json())
        .then((updated) => {
          setFeedbacks((prev) =>
            prev.map((f) => (f.id === updated.id ? updated : f))
          );
          setEditingFeedback(null);
        });
    } else {
      // Добавление нового отзыва
      fetch('http://localhost:3000/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Anonymous', feedback: data.feedback }),
      })
        .then((res) => res.json())
        .then((newFeedback) => setFeedbacks((prev) => [...prev, newFeedback]));
    }
  };

  const handleDeleteFeedback = (id) => {
    fetch(`http://localhost:3000/feedbacks/${id}`, { method: 'DELETE' }).then(() => {
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    });
  };

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);
  };

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
