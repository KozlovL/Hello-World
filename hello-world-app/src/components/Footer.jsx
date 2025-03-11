// components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', padding: '1rem' }}>
      <Typography variant="body2" color="white" align="center">
        © 2025 Козлов Леонид
      </Typography>
    </Box>
  );
}
