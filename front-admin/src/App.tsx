
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/dashboard/Dashboard";
import UserManagementPage from "./pages/UserManagement";
import ProductManagementPage from "./pages/product/ProductManagement";
import MainCategoryManagementPage from "./pages/category/CategoryManagement";
import UpdateProductPage from "./pages/product/UpdateProductPage";
import SubCategoryManagementPage from "./pages/category/SubCategoryManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DefaultLayout from "./layouts/DefaultLayout";
import BulkProducAddingPage from "./pages/product/BulkProducAddingPage";
import Banner from "./pages/BannerManagement"
import OrderManagementPage from "./pages/order/OrderManagement";
import SalesReport from "./pages/SalesReports";

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
              <Route path="/bulk-upload" element={<BulkProducAddingPage />} />
              <Route path="/order" element={<OrderManagementPage />} />

              <Route path="/categories/main" element={<MainCategoryManagementPage />} />
              <Route path="/categories/sub" element={<SubCategoryManagementPage />} />
              <Route path="/banner" element={<Banner />} />
              <Route path="/sales-report" element={<SalesReport />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
