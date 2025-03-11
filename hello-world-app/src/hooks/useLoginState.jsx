import { useState, useEffect } from 'react';

// Кастомный хук для управления состоянием авторизации
const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации
  const [username, setUsername] = useState(''); // Имя пользователя

  // При монтировании компонента проверяем статус авторизации в localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedUsername = localStorage.getItem('username');
    if (loggedIn && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  // Функция для входа
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Получаем список пользователей
    const user = users.find((u) => u.username === username && u.password === password); // Ищем пользователя

    if (user) {
      setIsLoggedIn(true);
      setUsername(username);
      localStorage.setItem('isLoggedIn', 'true'); // Сохраняем статус авторизации
      localStorage.setItem('username', username); // Сохраняем имя пользователя
    } else {
      alert('Неверное имя пользователя или пароль'); // Сообщение об ошибке
    }
  };

  // Функция для выхода
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.setItem('isLoggedIn', 'false'); // Удаляем статус авторизации
    localStorage.removeItem('username'); // Удаляем имя пользователя
  };

  return { isLoggedIn, username, login, logout }; // Возвращаем состояние и методы
};

export default useLoginState;