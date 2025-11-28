// src/App.jsx

import "./App.css";
import { Routes, Route } from "react-router-dom";

// 1. استيراد المكونات والأدوات اللازمة
import Navbar from "./components/layout/Navbar";
// import ProtectedRoute from "./components/routes/Protect؟edRoute"; // <-- استيراد "الحارس"

// استيراد الصفحات
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"; // <-- يفضل استخدام اسم كامل وواضح
import RegisterPage from "./pages/RegisterPage"; // <-- يفضل استخدام اسم كامل وواضح
import Profile from "./pages/Profile";
import AddReflection from "./pages/AddReflection";
// import ReflectionDetails from "../pages/ReflectionDetails";
import PublicProfile from "./pages/PublicProfile";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AddReflectionPage from "./pages/AddReflectionPage";
import EditProfilePage from "./pages/EditProfilePage";
import ReflectionDetails from './pages/ReflectionDetails'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* --- القسم الأول: المسارات العامة (متاحة للجميع) --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* هل صفحة الملف الشخصي العام يجب أن تكون عامة؟ إذا نعم، اتركها هنا */}
        <Route path="/users/:userId" element={<PublicProfile />} />
        {/* --- القسم الثاني: المسارات المحمية (تتطلب تسجيل الدخول) --- */}
          <Route element={<ProtectedRoute />}>
          {/* كل المسارات داخل هذا القسم ستكون محمية تلقائياً */}
          <Route path="/" element={< Home />} />

          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/add" element={<AddReflection />} /> */}
          <Route path="/add" element={<AddReflectionPage />} />

          <Route path="/profile/edit" element={<EditProfilePage />} />

          <Route path="/reflections/:reflectionId" element={<ReflectionDetails />} />

        </Route>
        

      </Routes>
    </>
  );
}

export default App;
