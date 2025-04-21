import React from 'react';
import UserProfile from '../components/UserProfile';
import useServerAuth from '../hooks/useServerAuth';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Lab6 = () => {
  const { isLoggedIn, username, login, logout } = useServerAuth();
  const [isRegistering, setIsRegistering] = React.useState(false);

  // Пример для обработчика регистрации
const handleRegister = async (data) => {
  const newUser = {
    username: data.username,
    password: data.password,
    role: 'user', // по умолчанию
    isBlocked: false,
  };

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      alert('Регистрация успешна!');
      // тут можно переключиться на login
    } else {
      alert('Ошибка при регистрации');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Ошибка при подключении к серверу');
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
