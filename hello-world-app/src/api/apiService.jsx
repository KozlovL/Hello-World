const API_URL = 'http://localhost:3001/api';

// Общая функция для выполнения запросов
const fetchData = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Методы для работы с авторизацией
export const authAPI = {
  login: (credentials) => fetchData('/login', 'POST', credentials),
};

// Методы для работы с пользователями
export const userAPI = {
  updateProfile: (id, userData) => fetchData(`/users/${id}`, 'PUT', userData),
};

// Методы для работы с отзывами
export const feedbackAPI = {
  getFeedbacks: () => fetchData('/feedbacks'),
  createFeedback: (feedback) => fetchData('/feedbacks', 'POST', feedback),
  deleteFeedback: (id) => fetchData(`/feedbacks/${id}`, 'DELETE'),
};

export default {
  authAPI,
  userAPI,
  feedbackAPI,
};