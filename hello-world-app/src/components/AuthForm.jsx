// components/AuthForm.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (data) => {
    onLogin(data.username, data.password);
  };

  const handleRegister = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.username === data.username)) {
      alert('Пользователь с таким именем уже существует');
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    const newUser = { username: data.username, password: data.password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация прошла успешно!');
    setIsRegistering(false); // Переключение обратно на форму входа
  };

  return (
    <>
      {isRegistering ? (
        <RegisterForm
          onSubmit={handleRegister}
          onToggleLogin={() => setIsRegistering(false)}
        />
      ) : (
        <LoginForm
          onSubmit={handleLogin}
          onToggleRegister={() => setIsRegistering(true)}
        />
      )}
    </>
  );
};

export default AuthForm;
