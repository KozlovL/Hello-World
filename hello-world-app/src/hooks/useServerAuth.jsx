// src/hooks/useServerAuth.js
import { useState, useEffect } from 'react';
import { authAPI } from '../api/apiService';

const useServerAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    const loggedIn = localStorage.getItem('server_isLoggedIn') === 'true';
    const savedUsername = localStorage.getItem('server_username');
    if (loggedIn && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const login = async (username, password) => {
    try {
      // Логируем перед вызовом API
      console.log('Attempting login with Username:', username);
      console.log('Attempting login with Password:', password);
  
      // Передаем два отдельных параметра
      const res = await authAPI.login(username, password);
      console.log('API response:', res);
  
      if (res.length > 0) {
        setIsLoggedIn(true);
        setUsername(username);
        localStorage.setItem('server_isLoggedIn', 'true');
        localStorage.setItem('server_username', username);
      } else {
        alert('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Не удалось войти. Проверьте соединение с сервером.');
    }
  };
  
  
  // Функция для выхода
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.setItem('server_isLoggedIn', 'false');
    localStorage.removeItem('server_username');
  };

  return { isLoggedIn, username, login, logout };
};

export default useServerAuth;
