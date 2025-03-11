import React, { useEffect } from 'react'; // Добавляем useEffect
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../components/ThemeContext';
import { increment, decrement } from '../redux/actions';

const Lab4 = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Получаем текущую тему

  // Стили в зависимости от темы
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

  // Пример использования useEffect
  useEffect(() => {
    // Этот код выполнится при монтировании компонента
    console.log('Компонент Lab4 смонтирован');

    // Изменяем заголовок страницы
    document.title = `Лабораторная работа 4 (Счетчик: ${count})`;

    // Функция cleanup выполнится при размонтировании компонента
    return () => {
      console.log('Компонент Lab4 размонтирован');
      document.title = 'React App'; // Возвращаем заголовок по умолчанию
    };
  }, [count]); // Зависимость: эффект сработает при изменении count

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