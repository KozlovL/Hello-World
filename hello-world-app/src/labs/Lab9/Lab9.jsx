// src/pages/Lab9.js
import React from 'react';
import { Provider } from 'react-redux';
import lab9Store from './lab9Store';
import useServerAuth from '../../hooks/useServerAuth';
import AdminPage from '../../components/AdminPage';
import ReadOnlyFeedback from '../../components/ReadOnlyFeedback';
import { useGetFeedbackQuery } from './Lab9Api';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const FeedbackContent = ({ role }) => {
  const { data, isLoading, isError, isFetching } = useGetFeedbackQuery();

  if (isLoading || isFetching) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt={4}>
        <Alert severity="error">Ошибка при загрузке данных с сервера.</Alert>
      </Box>
    );
  }

  return role === 'admin' ? (
    <AdminPage feedback={data} />
  ) : (
    <ReadOnlyFeedback feedback={data} />
  );
};

const Lab9 = () => {
  const { role, isLoggedIn } = useServerAuth();

  if (!isLoggedIn) return <p>Сначала войдите в систему</p>;

  return (
    <Provider store={lab9Store}>
      <div>
        <h1>Лабораторная работа 9</h1>
        <FeedbackContent role={role} />
      </div>
    </Provider>
  );
};

export default Lab9;
