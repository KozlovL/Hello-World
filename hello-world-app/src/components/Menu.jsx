// components/Menu.js
import React from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <Paper sx={{ padding: '1rem', width: 250 }}>
      <List>
        <ListItem button>
          <Link to="/lab-2" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Лабораторная работа 2" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/lab-3" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Лабораторная работа 3" />
          </Link>
        </ListItem>
      </List>
    </Paper>
  );
}
