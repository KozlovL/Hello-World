// components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Для навигации

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.main", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Слева: Текст о праве */}
      <Typography variant="body2" color="white" align="center">
        © 2025 Козлов Леонид
      </Typography>

      {/* Справа: Ссылки */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{ marginRight: 2, fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
        >
          <Link to="/feedback" style={{ textDecoration: 'none', color: 'white' }}>
            Обратная связь
          </Link>
        </Typography>

        <Typography
          variant="h6"
          sx={{ marginRight: 2, fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
        >
          <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
            Контакты
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
