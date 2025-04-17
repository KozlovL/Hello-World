import React from 'react';
import { useForm } from 'react-hook-form';

// Компонент формы регистрации
const RegisterForm = ({ onSubmit, onToggleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // для отслеживания значений полей
  } = useForm(); // Используем react-hook-form для управления формой

  // Получаем значения пароля и подтверждения пароля для проверки
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Функция для проверки совпадения паролей
  const handleRegisterSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    onSubmit(data); // Если пароли совпадают, передаем данные на регистрацию
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
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
            {...register('password', { required: 'Обязательное поле', minLength: { value: 6, message: 'Минимум 6 символов' } })} // Валидация: поле обязательно и минимум 6 символов
          />
          {errors.password && <span>{errors.password.message}</span>} {/* Сообщение об ошибке */}
        </div>

        <div>
          <label>Подтвердите пароль:</label>
          <input
            type="password"
            {...register('confirmPassword', { required: 'Подтвердите пароль' })} // Валидация: поле обязательно
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>} {/* Сообщение об ошибке */}
        </div>

        <button type="submit">Зарегистрироваться</button> {/* Кнопка отправки формы */}
      </form>
      <button onClick={onToggleLogin}>Уже есть аккаунт? Войти</button> {/* Кнопка переключения на авторизацию */}
    </div>
  );
};

export default RegisterForm;
