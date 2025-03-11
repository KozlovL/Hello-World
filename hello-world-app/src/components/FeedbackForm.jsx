import React from 'react';
import { useForm } from 'react-hook-form';

// Компонент формы обратной связи
const FeedbackForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Используем react-hook-form для управления формой

  return (
    <div>
      <h2>Форма обратной связи</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Отзыв:</label>
          <textarea
            {...register('feedback', { required: 'Обязательное поле' })} // Валидация: поле обязательно
          />
          {errors.feedback && <span>{errors.feedback.message}</span>} {/* Сообщение об ошибке */}
        </div>

        <button type="submit">Отправить</button> {/* Кнопка отправки формы */}
      </form>
    </div>
  );
};

export default FeedbackForm;