// api.js

const API_URL = 'http://localhost:3000/feedbacks';

// Получение всех отзывов
export const getFeedbacks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Ошибка получения отзывов');
  return response.json();
};

// Добавление нового отзыва
export const addFeedback = async (feedback) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  if (!response.ok) throw new Error('Ошибка добавления отзыва');
  return response.json();
};

// Редактирование отзыва
export const updateFeedback = async (id, updatedFeedback) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFeedback),
  });
  if (!response.ok) throw new Error('Ошибка обновления отзыва');
  return response.json();
};

// Удаление отзыва
export const deleteFeedback = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Ошибка удаления отзыва');
};
