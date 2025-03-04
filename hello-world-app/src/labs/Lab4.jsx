import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../components/ThemeContext';
import { increment, decrement } from '../redux/actions';

const Lab4 = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Получаем текущую тему

  const styles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    dark: {
      backgroundColor: '#333333',
      color: '#ffffff',
    },
  };

  return (
    <div style={styles[theme]}>
      <h1>Лабораторная работа 4</h1>
      <p>Счетчик: {count}</p>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
    </div>
  );
};

export default Lab4;