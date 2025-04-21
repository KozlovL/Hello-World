// pages/Lab8.js
import React from 'react';
import useServerAuth from '../hooks/useServerAuth';
import AdminPage from '../components/AdminPage';
import ReadOnlyFeedback from '../components/ReadOnlyFeedback';

const Lab8 = () => {
  const { role, isLoggedIn } = useServerAuth();

  if (!isLoggedIn) return <p>Сначала войдите в систему</p>;

  return (
    <div>
      <h1>Лабораторная работа 8</h1>
      {role === 'admin' ? <AdminPage /> : <ReadOnlyFeedback />}
    </div>
  );
};

export default Lab8;
