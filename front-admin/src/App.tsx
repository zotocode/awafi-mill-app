import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import UserManagementPage from './pages/UserManagement';
import ProductManagementPage from './pages/ProductManagement';
import CategoryManagementPage from './pages/CategoryManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/products" element={<ProductManagementPage />} />
        <Route path="/categories" element={<CategoryManagementPage />} />
        <Route path="/oreders" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;