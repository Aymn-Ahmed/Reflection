// src/components/routes/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // تأكد من أن هذا المسار صحيح

const ProtectedRoute = () => {
  // 1. استيراد loading بالإضافة إلى currentUser
  const { currentUser, loading } = useAuth();
  if (loading) {
    return null; // هذا يمنع إعادة التوجيه المبكرة
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // إذا انتهى التحميل وكان المستخدم موجوداً، اسمح له بالمرور.
  return <Outlet />;
};

export default ProtectedRoute;
