// components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Заголовок приложения */}
        <Typography variant="h6">
          Hello World App
        </Typography>

        {/* Кнопка изменения темы в правом углу */}
        <Box sx={{ marginLeft: "auto", marginRight: 2 }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}