import { useState, useEffect } from 'react';
import { authAPI } from '../api/apiService';

const useServerAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(''); // Добавлено состояние для роли

  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    const loggedIn = localStorage.getItem('server_isLoggedIn') === 'true';
    const savedUsername = localStorage.getItem('server_username');
    const savedRole = localStorage.getItem('server_role'); // Получаем роль из localStorage

    if (loggedIn && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      setRole(savedRole); // Устанавливаем роль
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
        const user = res[0]; // Получаем данные пользователя из ответа
        setIsLoggedIn(true);
        setUsername(user.username);
        setRole(user.role); // Устанавливаем роль пользователя
        localStorage.setItem('server_isLoggedIn', 'true');
        localStorage.setItem('server_username', user.username);
        localStorage.setItem('server_role', user.role); // Сохраняем роль в localStorage
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
    setRole(''); // Очищаем роль при выходе
    localStorage.setItem('server_isLoggedIn', 'false');
    localStorage.removeItem('server_username');
    localStorage.removeItem('server_role');
  };

  return { isLoggedIn, username, role, login, logout }; // Возвращаем роль
};

export default useServerAuth;
