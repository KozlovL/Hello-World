import React from 'react';
import { useForm } from 'react-hook-form';

// Компонент формы регистрации
const RegisterForm = ({ onSubmit, onToggleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Используем react-hook-form для управления формой

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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