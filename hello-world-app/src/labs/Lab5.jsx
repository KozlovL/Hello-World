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
  const handleLogin = useCallback((username, password) => {
    console.log("Попытка входа с данными:", username, password); // Добавим отладочное сообщение
    
    // Получаем список пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Список пользователей в localStorage:", users); // Логируем список пользователей

    // Ищем пользователя с таким именем и паролем
    const user = users.find((user) => user.username === username && user.password === password);
    console.log("Найденный пользователь:", user); // Логируем, что было найдено

    if (user) {
      // Если пользователь найден, выполняем вход
      login(username, password);
    } else {
      alert('Неверное имя пользователя или пароль');
    }
  }, [login]);

  // Обработчик регистрации
  const handleRegister = useCallback((data) => {
    const { username, password } = data;
    console.log("Регистрация с данными:", username, password); // Добавляем отладочное сообщение
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Проверяем, есть ли уже пользователь с таким именем
    const userExists = users.some((user) => user.username === username);
    console.log("Пользователь с таким именем уже существует:", userExists); // Логируем, если такой пользователь уже есть
    
    if (userExists) {
      alert('Пользователь с таким именем уже существует');
      return;
    }
    
    // Добавляем нового пользователя
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log("Обновленный список пользователей:", users); // Логируем обновленный список пользователей
    
    // Авторизуем пользователя после регистрации
    login(username, password);
  }, [login]);

  // Обработчик отправки отзыва
  const handleFeedbackSubmit = useCallback((data) => {
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
