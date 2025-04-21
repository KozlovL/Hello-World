// App.jsx
import React, { useState } from 'react';
import { useTheme } from './components/ThemeContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuDrawer from './components/MenuDrawer';
import './App.css';

const App = () => {
  const { theme } = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className={theme}>
      <Router>
        <Header onMenuClick={handleDrawerToggle} />
        <MenuDrawer open={isDrawerOpen} onClose={handleDrawerToggle} />
        <Content />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
