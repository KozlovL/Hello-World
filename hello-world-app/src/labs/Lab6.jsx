import React from 'react';
import UserProfile from '../components/UserProfile';
import useServerAuth from '../hooks/useServerAuth';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Lab6 = () => {
  const { isLoggedIn, username, login, logout } = useServerAuth();
  const [isRegistering, setIsRegistering] = React.useState(false);

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
        login(data.username, data.password);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  const handleEditProfile = (newUsername) => {
    login(newUsername, '');
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Лабораторная работа 6</h1>
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
    </div>
  );
};

export default Lab6;
