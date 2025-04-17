import React, { useState, useEffect } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import useServerAuth from '../hooks/useServerAuth';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import UserProfile from '../components/UserProfile';
import { feedbackAPI } from '../api/apiService'; // Подключаем API для работы с отзывами
import { authAPI } from '../api/apiService'; // Подключаем API для работы с авторизацией

const Lab6 = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const { isLoggedIn, username, login, logout } = useServerAuth();
  const [isRegistering, setIsRegistering] = useState(false);

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

  const handleEditProfile = (newUsername) => {
    // Обновляем имя пользователя локально через метод login
    login(newUsername, '');  // Или используйте setUsername, если у вас отдельное состояние для username
  };

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

  const handleRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users?username=${data.username}`);
      const users = await response.json();

      if (users.length > 0) {
        alert('Пользователь с таким именем уже существует');
      } else {
        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: data.username, password: data.password }),
        });
        alert('Регистрация прошла успешно!');
        setIsRegistering(false);
        login(data.username, data.password);  // Логинимся сразу после регистрации
      }
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        {isRegistering ? (
          <RegisterForm
            onSubmit={handleRegister}
            onToggleLogin={() => setIsRegistering(false)}
          />
        ) : (
          <LoginForm
            onSubmit={login}
            onToggleRegister={() => setIsRegistering(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Лабораторная работа 6</h1>
      <UserProfile username={username} onLogout={logout} onEditProfile={handleEditProfile} />
      <FeedbackForm onSubmit={handleAddFeedback} initialData={editingFeedback} />
      <FeedbackList
        feedbacks={feedbacks}
        onDelete={handleDeleteFeedback}
        onEdit={setEditingFeedback}
      />
    </div>
  );
};

export default Lab6;
