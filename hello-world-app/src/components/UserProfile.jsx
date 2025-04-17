import React, { useState } from 'react';
import { Card, Typography, Avatar, Button, Box, TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { authAPI } from '../api/apiService'; // Подключаем API для работы с авторизацией

const UserProfile = ({ username, onLogout, onEditProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  // Включение режима редактирования
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Сохранение изменений в никнейме
  const handleSave = async () => {
    if (newUsername === '') {
      alert('Имя пользователя не может быть пустым');
      return;
    }

    try {
      // Вызываем функцию для обновления только никнейма через API
      await authAPI.updateProfile(username, newUsername);  // Вызов API для обновления профиля
      setIsEditing(false);
      alert('Никнейм обновлен!');
      onEditProfile(newUsername);  // Обновляем локальное состояние в родительском компоненте
    } catch (error) {
      console.error('Ошибка при обновлении никнейма:', error);
      alert('Ошибка при обновлении никнейма');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 1, maxWidth: 300 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          {username?.[0]?.toUpperCase() || '?'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">
            {isEditing ? 'Редактировать профиль' : `Пользователь: ${username}`}
          </Typography>

          {isEditing ? (
            <>
              <TextField
                label="Имя пользователя"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Сохранить
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEditClick}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            >
              Редактировать профиль
            </Button>
          )}

          <Button
            onClick={onLogout}
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            sx={{ mt: 1 }}
          >
            Выйти
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default UserProfile;
