// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 1. إضافة useLocation
import { Container, Box } from "@mui/material";
import LoginForm from "../features/auth/components/LoginForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 2. الحصول على معلومات الموقع الحالي
  const { login } = useAuth();

  // 3. تحديد الصفحة التي يجب الانتقال إليها بعد تسجيل الدخول
  // إذا حاول المستخدم الوصول إلى صفحة محمية وتم توجيهه إلى هنا،
  // فإن location.state.from.pathname ستحتوي على تلك الصفحة.
  // وإلا، انتقل إلى الصفحة الرئيسية.
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);

      // ✅ الكود الصحيح:
      // ببساطة، حاول تسجيل الدخول.
      // إذا نجحت، سيكمل الكود.
      // إذا فشلت، سيتم إلقاء خطأ، وسينتقل التنفيذ فوراً إلى قسم catch.
      await login(email, password);

      // إذا وصلنا إلى هنا، فهذا يعني أن تسجيل الدخول قد نجح.
      // انتقل إلى الصفحة التي كان المستخدم يحاول الوصول إليها، أو إلى الصفحة الرئيسية.
      navigate(from, { replace: true }); // 4. استخدام "from" و replace

    } catch (err) {
      // إذا حدث خطأ (من دالة login)، اعرض رسالته
      setError(err.message);
    } finally {
      // هذا سيتم تنفيذه دائماً، سواء نجحت العملية أو فشلت
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
      </Box>
    </Container>
  );
};

export default LoginPage;
