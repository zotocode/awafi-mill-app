// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./state/store";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import UserManagementPage from "./pages/UserManagement";
import ProductManagementPage from "./pages/ProductManagement";
import MainCategoryManagementPage from "./pages/CategoryManagement";
import UpdateProductPage from "./pages/UpdateProductPage";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import SubCategoryManagementPage from "./pages/SubCategoryManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<Navbar />}>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
          </Route>

          {/* Protected Routes */}
          <Route element={<Navbar />}>
            <Route element={<Sidebar />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UserManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-product/:id"
                element={
                  <ProtectedRoute>
                    <UpdateProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories/main"
                element={
                  <ProtectedRoute>
                    <MainCategoryManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories/sub"
                element={
                  <ProtectedRoute>
                    <SubCategoryManagementPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
