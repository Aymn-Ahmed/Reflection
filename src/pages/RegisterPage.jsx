// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import RegisterForm from '../features/auth/components/RegisterForm';
// 1. ✅ استيراد الخطاف السحري بدلاً من دالة الـ API مباشرة
import { useAuth } from '../context/AuthContext'; 

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // 2. ✅ الحصول على دالة signup من السياق
  const { signup } = useAuth(); 

  const handleRegister = async ({ name, email, password, confirmPassword }) => {
    // التحقق من المدخلات (يبقى كما هو، فهو ممتاز)
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    if (password.length < 6) {
      setError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 3. ✅ استدعاء دالة signup من السياق
      // هذه الدالة ستقوم باستدعاء registerUser داخلياً ثم تحديث حالة currentUser
      await signup(name, email, password);

      // إذا وصلنا إلى هنا، فالتسجيل نجح والمستخدم الآن مسجل دخوله في السياق
      navigate('/'); 

    } catch (err) {
      // قسم معالجة الأخطاء هذا ممتاز، لكننا سنبسطه قليلاً
      // بما أننا لم نعد نستخدم Firebase مباشرة، سنعتمد على الرسالة العامة
      setError(err.message || "حدث خطأ غير متوقع. الرجاء المحاولة لاحقاً.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RegisterForm 
          onSubmit={handleRegister} 
          error={error} 
          loading={loading} 
        />
      </Box>
    </Container>
  );
};

export default RegisterPage;
