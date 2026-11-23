import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

import HomePage from '@/pages/Home/HomePage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import ToursPage from '@/pages/Tours/ToursPage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import AdminDashboardPage from '@/pages/Admin/AdminDashboardPage';

// All app routes in one place.
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public website (with Navbar) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tour" element={<ToursPage />} />

        {/* Logged-in users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin panel (no Navbar) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
