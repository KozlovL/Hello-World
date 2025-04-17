import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom"; // Для навигации
import MenuIcon from "@mui/icons-material/Menu"; // Иконка для меню
import ThemeToggle from './ThemeToggle'; // Переключатель темы

export default function Header({ onMenuClick }) {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Кнопка открытия меню */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Контейнер для логотипа и ссылок */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Ссылки в правом углу */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{ marginRight: 2, fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Главная
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginRight: 2, fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
          >
            <Link to="/about-me" style={{ textDecoration: 'none', color: 'white' }}>
              О себе
            </Link>
          </Typography>

          {/* Кнопка изменения темы */}
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
