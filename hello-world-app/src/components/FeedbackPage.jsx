// components/ContactPage.js
import React, { useState, useEffect } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import { feedbackAPI } from '../api/apiService'; // Подключаем API для работы с отзывами
import useServerAuth from '../hooks/useServerAuth';

const ContactPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const { isLoggedIn, username, login, logout } = useServerAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchFeedbacks = async () => {
      try {
        const data = await feedbackAPI.getFeedbacks();
        const uniqueFeedbacks = Array.from(new Set(data.map(a => a.id)))
          .map(id => data.find(a => a.id === id));
        setFeedbacks(uniqueFeedbacks);
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
      }
    };

    fetchFeedbacks();
  }, [isLoggedIn]);

  const handleAddFeedback = (data) => {
    if (editingFeedback) {
      // Обновление существующего отзыва
      const updatedFeedback = {
        ...editingFeedback,
        feedback: data.feedback,
      };

      feedbackAPI.updateFeedback(updatedFeedback.id, updatedFeedback)
        .then((updated) => {
          setFeedbacks((prev) =>
            prev.map((f) => (f.id === updated.id ? updated : f))
          );
          setEditingFeedback(null);
        })
        .catch((error) => {
          console.error('Ошибка при обновлении отзыва:', error);
        });
    } else {
      // Создание нового отзыва
      feedbackAPI.createFeedback({
        username: username || 'Anonymous',  // Используем никнейм пользователя или "Anonymous"
        feedback: data.feedback,
      })
        .then((newFeedback) => {
          setFeedbacks((prev) => [...prev, newFeedback]);
        })
        .catch((error) => {
          console.error('Ошибка при добавлении отзыва:', error);
        });
    }
  };

  const handleDeleteFeedback = (id) => {
    feedbackAPI.deleteFeedback(id)
      .then(() => {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      })
      .catch((error) => {
        console.error('Ошибка при удалении отзыва:', error);
      });
  };

  return (
    <div>
      <h1>Обратная связь</h1>
      <FeedbackForm onSubmit={handleAddFeedback} initialData={editingFeedback} />
      <FeedbackList
        feedbacks={feedbacks}
        onDelete={handleDeleteFeedback}
        onEdit={setEditingFeedback}
      />
    </div>
  );
};

export default ContactPage;
