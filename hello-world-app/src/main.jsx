import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/ThemeContext';
import App from './App';
import store from './redux/store';

// Создаем корневой элемент
const container = document.getElementById('root');
const root = createRoot(container);

// Рендерим приложение
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);