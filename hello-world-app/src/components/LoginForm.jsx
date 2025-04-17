import React from 'react';
import { useForm } from 'react-hook-form';

// Компонент формы авторизации
const LoginForm = ({ onSubmit, onToggleRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Используем react-hook-form для управления формой

  const onFormSubmit = (data) => {
    console.log("Данные формы для входа:", data); // Логируем передаваемые данные
    const { username, password } = data; // Деструктурируем данные
    onSubmit(username, password); // Передаем два параметра в onSubmit
  };
  

  return (
    <div>
      <h1>Авторизация</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label>Имя пользователя:</label>
          <input
            {...register('username', { required: 'Обязательное поле' })} // Валидация: поле обязательно
          />
          {errors.username && <span>{errors.username.message}</span>} {/* Сообщение об ошибке */}
        </div>

        <div>
          <label>Пароль:</label>
          <input
            type="password"
            {...register('password', { required: 'Обязательное поле' })} // Валидация: поле обязательно
          />
          {errors.password && <span>{errors.password.message}</span>} {/* Сообщение об ошибке */}
        </div>

        <button type="submit">Войти</button> {/* Кнопка отправки формы */}
      </form>
      <button onClick={onToggleRegister}>Нет аккаунта? Зарегистрироваться</button> {/* Кнопка переключения на регистрацию */}
    </div>
  );
};

export default LoginForm;
