import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FeedbackForm = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // При редактировании подставляем текст
  useEffect(() => {
    if (initialData) {
      reset({ feedback: initialData.feedback });
    }
  }, [initialData, reset]);

  return (
    <div>
      <h2>{initialData ? 'Редактировать отзыв' : 'Форма обратной связи'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Отзыв:</label>
          <textarea
            {...register('feedback', { required: 'Обязательное поле' })}
          />
          {errors.feedback && <span>{errors.feedback.message}</span>}
        </div>

        <button type="submit">{initialData ? 'Сохранить' : 'Отправить'}</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
