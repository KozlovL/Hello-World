import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Переключить тему: {theme === 'light' ? 'Ночь' : 'День'}
    </button>
  );
};

export default ThemeToggle;