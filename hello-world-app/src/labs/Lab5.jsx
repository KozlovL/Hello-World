import React, { useState, useCallback } from 'react';
import useLoginState from '../hooks/useLoginState'; // Хук для управления авторизацией
import LoginForm from '../components/LoginForm'; // Форма авторизации
import RegisterForm from '../components/RegisterForm'; // Форма регистрации
import FeedbackForm from '../components/FeedbackForm'; // Форма обратной связи
import FeedbackList from '../components/FeedbackList'; // Список отзывов
import UserProfile from '../components/UserProfile'; // Профиль пользователя

const Lab5 = () => {
  const { isLoggedIn, username, login, logout } = useLoginState(); // Используем хук авторизации
  const [feedbacks, setFeedbacks] = useState([]); // Состояние для хранения отзывов
  const [showRegister, setShowRegister] = useState(false); // Состояние для переключения между формами

  // Обработчик авторизации
  const handleLogin = useCallback((data) => {
    console.log('Авторизация:', data);
    login(data.username, data.password); // Вызываем функцию входа
  }, [login]);

  // Обработчик регистрации
  const handleRegister = useCallback((data) => {
    console.log('Регистрация:', data);
    const users = JSON.parse(localStorage.getItem('users')) || []; // Получаем список пользователей
    users.push({ username: data.username, password: data.password }); // Добавляем нового пользователя
    localStorage.setItem('users', JSON.stringify(users)); // Сохраняем обновленный список
    login(data.username, data.password); // Авторизуем пользователя после регистрации
  }, [login]);

  // Обработчик отправки отзыва
  const handleFeedbackSubmit = useCallback((data) => {
    console.log('Отзыв:', data);
    const feedbackWithUsername = { name: username, feedback: data.feedback }; // Добавляем имя пользователя к отзыву
    setFeedbacks((prev) => [...prev, feedbackWithUsername]); // Обновляем список отзывов
  }, [username]);

  // Если пользователь не авторизован, показываем форму авторизации или регистрации
  if (!isLoggedIn) {
    return showRegister ? (
      <RegisterForm onSubmit={handleRegister} onToggleLogin={() => setShowRegister(false)} />
    ) : (
      <LoginForm onSubmit={handleLogin} onToggleRegister={() => setShowRegister(true)} />
    );
  }

  // Если пользователь авторизован, показываем приложение
  return (
    <div>
      <UserProfile username={username} onLogout={logout} /> {/* Профиль пользователя */}
      <h1>Лабораторная работа 5</h1>
      <FeedbackForm onSubmit={handleFeedbackSubmit} /> {/* Форма обратной связи */}
      <FeedbackList feedbacks={feedbacks} /> {/* Список отзывов */}
    </div>
  );
};

export default Lab5;