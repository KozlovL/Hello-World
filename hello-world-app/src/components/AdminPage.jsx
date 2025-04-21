import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import AdminFeedbackTable from '../components/AdminFeedbackTable';
import useServerAuth from '../hooks/useServerAuth';

const AdminPage = () => {
  const { username, role } = useServerAuth();
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    if (role !== 'admin') return;

    const fetchData = async () => {
      const resUsers = await fetch('http://localhost:3000/users');
      const usersData = await resUsers.json();
      setUsers(usersData);

      const resFb = await fetch('http://localhost:3000/feedbacks');
      const fbData = await resFb.json();
      setFeedbacks(fbData);
    };

    fetchData();
  }, [role]);

  if (role !== 'admin') return <p>Доступ запрещён</p>;

  return (
    <div>
      <h2>Панель администратора</h2>
      <UserTable users={users} setUsers={setUsers} />
      <AdminFeedbackTable feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
    </div>
  );
};

export default AdminPage;
