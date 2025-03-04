// App.js
import { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Nav from "./components/Nav"; // Импортируем компонент навигации

// Основной компонент приложения
export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Используем компонент навигации */}
      <Nav />
      {/* Основное содержимое страницы */}
      <main className="flex flex-col items-center mt-8">
        <Card className="p-6 shadow-lg">
          {/* Заголовок приложения */}
          <h1 className="text-2xl font-bold mb-4">Hello, World!</h1>
          {/* Вставка кнопки-счетчика */}
          <CounterButton />
        </Card>
      </main>
    </div>
  );
}

// Компонент кнопки-счетчика
function CounterButton() {
  const [count, setCount] = useState(0); // Состояние для хранения количества нажатий
  return (
    <Button onClick={() => setCount(count + 1)} className="mt-4">
      Clicked {count} times
    </Button>
  );
}
