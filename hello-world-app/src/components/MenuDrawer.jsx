// components/MenuDrawer.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const labLinks = [
  { label: 'Лабораторная 2', path: '/lab-2' },
  { label: 'Лабораторная 3', path: '/' },
  { label: 'Лабораторная 4', path: '/lab-4' },
  { label: 'Лабораторная 5', path: '/lab-5' },
  { label: 'Лабораторная 6', path: '/lab-6' },
];

export default function MenuDrawer({ open, onClose }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {labLinks.map((item) => (
          <ListItem button key={item.path} component={Link} to={item.path} onClick={onClose}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
