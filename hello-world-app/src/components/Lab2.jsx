// labs/Lab2.js
import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Nav from "../components/Nav"; // Навигация

export default function Lab2() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Nav />
      <main className="flex flex-col items-center mt-8">
        <Card className="p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Hello, World!</h1>
          <CounterButton />
        </Card>
      </main>
    </div>
  );
}

// Компонент кнопки-счетчика
function CounterButton() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount(count + 1)} className="mt-4">
      Clicked {count} times
    </Button>
  );
}
