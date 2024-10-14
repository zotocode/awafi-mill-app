import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import UserManagementPage from './pages/UserManagement';
import ProductManagementPage from './pages/ProductManagement';
import CategoryManagementPage from './pages/CategoryManagement';
import UpdateProductPage from './pages/updateProductPage';
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Navbar />}>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Sidebar />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/products" element={<ProductManagementPage />} />
          <Route path="/update-product/:id" element={<UpdateProductPage />} />
          <Route path="/categories" element={<CategoryManagementPage />} />
          <Route path="/oreders" element={<DashboardPage />} />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;