// src/context/AuthContext.jsx

import React, { useContext, useState, useEffect } from "react"; // 1. استيراد useEffect
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../features/auth/api/authAPI";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // 2. إضافة حالة التحميل

  // 3. استخدام useEffect للتحقق من localStorage مرة واحدة فقط عند بدء تشغيل التطبيق
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    // بعد الانتهاء من التحقق (سواء وجدنا مستخدماً أم لا)، نوقف التحميل
    setLoading(false);
  }, []); // المصفوفة الفارغة تعني "نفذ هذا مرة واحدة فقط"

  const signup = async (email, password, name) => {
    const { user } = await registerUser(email, password, name);
    updateUserState(user);
    return user;
  };

  const login = async (email, password) => {
    const { user, message } = await loginUser(email, password);
    if (user) {
      updateUserState(user);
    }
    return { user, message };
  };

  const logout = async () => {
    await logoutUser();
    updateUserState(null);
  };

  const updateUserState = (newUserData) => {
    setCurrentUser(newUserData);
    if (newUserData) {
      localStorage.setItem('currentUser', JSON.stringify(newUserData));
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  const value = {
    currentUser,
    loading, // 4. توفير حالة التحميل لبقية التطبيق
    signup,
    login,
    logout,
    updateUserState, 
  };
  
  // 5. لا تعرض التطبيق حتى ننتهي من التحقق من localStorage
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
