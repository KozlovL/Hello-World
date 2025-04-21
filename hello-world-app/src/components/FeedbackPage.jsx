import React, { useState, useEffect } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import { feedbackAPI } from '../api/apiService'; // Подключаем API для работы с отзывами
import useServerAuth from '../hooks/useServerAuth';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [error, setError] = useState(null); // Для отображения ошибок
  const { isLoggedIn, username, login, logout } = useServerAuth();

  // Загружаем отзывы при авторизации или без авторизации
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await feedbackAPI.getFeedbacks();
        // Убираем дублирующиеся отзывы по id с использованием Map
        const uniqueFeedbacks = Array.from(new Map(data.map(a => [a.id, a])).values());
        setFeedbacks(uniqueFeedbacks);
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        setError('Не удалось загрузить отзывы');
      }
    };

    fetchFeedbacks();
  }, [isLoggedIn]); // Перезапускать при изменении состояния авторизации

  const handleAddFeedback = (data) => {
    setError(null); // Сбрасываем ошибки перед отправкой данных

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
          setEditingFeedback(null); // После обновления очищаем состояние редактирования
        })
        .catch((error) => {
          console.error('Ошибка при обновлении отзыва:', error);
          setError('Не удалось обновить отзыв');
        });
    } else {
      // Создание нового отзыва
      feedbackAPI.createFeedback({
        username: username || 'Anonymous',
        feedback: data.feedback,
        isBlocked: false, // важно!
      })
      
        .then((newFeedback) => {
          setFeedbacks((prev) => [...prev, newFeedback]); // Добавляем новый отзыв в конец списка
        })
        .catch((error) => {
          console.error('Ошибка при добавлении отзыва:', error);
          setError('Не удалось добавить отзыв');
        });
    }
  };

  const handleDeleteFeedback = (id) => {
    feedbackAPI.deleteFeedback(id)
      .then(() => {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id)); // Убираем удаленный отзыв из списка
      })
      .catch((error) => {
        console.error('Ошибка при удалении отзыва:', error);
        setError('Не удалось удалить отзыв');
      });
  };

  return (
    <div>
      <h1>Обратная связь</h1>
      {error && <div className="error-message">{error}</div>} {/* Показываем ошибку, если есть */}
      <FeedbackForm onSubmit={handleAddFeedback} initialData={editingFeedback} />
      <FeedbackList
        feedbacks={feedbacks}
        onDelete={handleDeleteFeedback}
        onEdit={setEditingFeedback} // При клике на "редактировать" передаем отзыв для редактирования
      />
    </div>
  );
};

export default FeedbackPage;
