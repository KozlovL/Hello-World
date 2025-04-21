// src/components/Button.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('вызывает onClick при нажатии', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Нажми</Button>
    );

    const button = getByText('Нажми');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1); // Проверяем, что функция была вызвана один раз
  });

  it('отображает переданный текст', () => {
    const { getByText } = render(
      <Button onClick={() => {}}>Сохранить</Button>
    );

    expect(getByText('Сохранить')).toBeInTheDocument(); // Проверяем, что текст "Сохранить" отображается
  });

  it('принимает и применяет дополнительный className', () => {
    const { getByText } = render(
      <Button onClick={() => {}} className="custom-class">
        Кнопка
      </Button>
    );

    const button = getByText('Кнопка');
    expect(button).toHaveClass('custom-class'); // Проверяем, что класс custom-class применен к кнопке
  });
});
