import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import UserManagementPage from "./pages/UserManagement";
import ProductManagementPage from "./pages/ProductManagement";
import MainCategoryManagementPage from "./pages/CategoryManagement";
import UpdateProductPage from "./pages/UpdateProductPage";
import SubCategoryManagementPage from "./pages/SubCategoryManagementPage";
import Banner from "./pages/BannerManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DefaultLayout from "./layouts/DefaultLayout";
import BulkProducAddingPage from "./pages/BulkProducAddingPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DefaultLayout />}>

              <Route path="/dashboard" element={<DashboardPage />} />

              <Route path="/users" element={<UserManagementPage />} />

              <Route path="/products" element={<ProductManagementPage />} />
              <Route path="/update-product/:id" element={<UpdateProductPage />} />
              <Route path="/bulk-adding" element={<BulkProducAddingPage />} />

              <Route path="/categories/main" element={<MainCategoryManagementPage />} />
              <Route path="/categories/sub" element={<SubCategoryManagementPage />} />
              <Route path="/banner" element={<Banner />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
