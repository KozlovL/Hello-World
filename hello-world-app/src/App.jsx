// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Lab2 from "./components/Lab2"; // Лабораторная работа 2

export default function App() {
  return (
    <Router>
      <Header />
      <div style={{ display: 'flex', marginTop: 20 }}>
        <Menu />  {/* Меню всегда слева */}
        <div style={{ marginLeft: 260, width: '100%' }}>
          <Routes>
            <Route path="/lab-2" element={<Lab2 />} />  {/* Лабораторная работа 2 */}
            <Route path="/lab-3" element={<Menu />} /> {/* Только меню */}
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}
