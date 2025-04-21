const API_URL = 'http://localhost:3000';  // Убираем /api, так как это не часть вашего пути

const fetchData = async (endpoint, method = 'GET', data = null) => {
  let url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Для GET запроса — добавляем параметры в URL, а не в body
  if (method === 'GET' && data) {
    const query = new URLSearchParams(data).toString();
    url += `?${query}`;
  } else if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};


export const authAPI = {
  login: (username, password) => {
    const query = new URLSearchParams({ username, password }).toString();
    return fetchData(`/users?${query}`, 'GET');
  },

  register: (username, password) =>
    fetchData('/users', 'POST', { username, password }),

  updateProfile: async (oldUsername, newUsername) => {
    try {
      const users = await fetchData(`/users?username=${oldUsername}`, 'GET');
      if (!users || users.length === 0) {
        throw new Error(`Пользователь "${oldUsername}" не найден`);
      }
      const user = users[0];
      return fetchData(`/users/${user.id}`, 'PUT', { ...user, username: newUsername });
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error.message);
      throw error;
    }
  }
};




// Методы для работы с отзывами
export const feedbackAPI = {
  getFeedbacks: () => fetchData('/feedbacks', 'GET'),
  createFeedback: (data) => fetchData('/feedbacks', 'POST', data),
  updateFeedback: (id, data) => fetchData(`/feedbacks/${id}`, 'PUT', data),
  deleteFeedback: (id) => fetchData(`/feedbacks/${id}`, 'DELETE'),
};

export const usersAPI = {
  getUsers: async () => {
    const res = await fetch('http://localhost:3000/users');
    return res.json();
  },
  deleteUser: async (id) => {
    return fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
  },
  updateUser: async (id, updates) => {
    return fetch(`http://localhost:3000/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  },
};