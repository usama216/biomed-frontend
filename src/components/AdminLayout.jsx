import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminBannersPage from '../pages/AdminBannersPage';
import AdminBlogsPage from '../pages/AdminBlogsPage';
import { isAdminLoggedIn } from '../api';

export default function AdminLayout() {
  return (
    <Routes>
      <Route index element={<AdminLoginPage />} />
      <Route
        path="dashboard"
        element={
          isAdminLoggedIn() ? (
            <AdminDashboardPage />
          ) : (
            <Navigate to="/admin" replace />
          )
        }
      />
      <Route
        path="banners"
        element={
          isAdminLoggedIn() ? (
            <AdminBannersPage />
          ) : (
            <Navigate to="/admin" replace />
          )
        }
      />
      <Route
        path="blogs"
        element={
          isAdminLoggedIn() ? (
            <AdminBlogsPage />
          ) : (
            <Navigate to="/admin" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
