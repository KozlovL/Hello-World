import React from 'react';
import { useTheme } from './ThemeContext';
import { Button } from '@mui/material'; // Импортируем Button из Material-UI

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      color="inherit" // Цвет текста кнопки будет соответствовать AppBar
      onClick={toggleTheme}
    >
      Переключить тему: {theme === 'light' ? 'Ночь' : 'День'}
    </Button>
  );
};

export default ThemeToggle;