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
    console.log('Login request - Username:', username);
    console.log('Login request - Password:', password);

    const query = new URLSearchParams({ username, password }).toString();
    console.log('Request URL:', `/users?${query}`);
    return fetchData(`/users?${query}`, 'GET');
  },
  register: (username, password) => fetchData('/users', 'POST', { username, password }),
  updateProfile: (oldUsername, newUsername) => {
    return fetchData(`/users?username=${oldUsername}`, 'GET')
      .then(users => {
        const user = users[0];  // Получаем текущего пользователя по старому никнейму
        return fetchData(`/users/${user.id}`, 'PUT', { ...user, username: newUsername });  // Обновляем только никнейм
      });
  }
};



// Методы для работы с отзывами
export const feedbackAPI = {
  getFeedbacks: () => fetchData('/feedbacks', 'GET'),
  createFeedback: (data) => fetchData('/feedbacks', 'POST', data),
  updateFeedback: (id, data) => fetchData(`/feedbacks/${id}`, 'PUT', data),
  deleteFeedback: (id) => fetchData(`/feedbacks/${id}`, 'DELETE'),
};
