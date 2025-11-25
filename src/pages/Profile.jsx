// src/pages/Profile.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/useAuthHook";
// استيراد الدوال من ملف الـ API الخاص بك
import { fetchUserReflections } from "../features/reflections/api/reflectionAPI";

import ProfileCard from "../features/users/components/ProfileCard";
import ReflectionList from "../components/reflections/ReflectionList";

const Profile = () => {
  const { currentUser } = useAuth();
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // تأكد من وجود المستخدم قبل محاولة جلب البيانات
    if (currentUser && currentUser.id) {
      // أو currentUser.uid حسب هيكل بياناتك
      const loadProfileData = async () => {
        try {
          setLoading(true);
          // --- استخدام دالتك مباشرة ---

          const userReflections = await fetchUserReflections(currentUser.id);
          setReflections(userReflections);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch user reflections:", err);
          setError("حدث خطأ أثناء جلب منشوراتك.");
        } finally {
          setLoading(false);
        }
      };

      loadProfileData();
    } else {
      // إذا لم يكن هناك مستخدم، لا تقم بالتحميل
      setLoading(false);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">
          يجب عليك تسجيل الدخول لعرض ملفك الشخصي.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProfileCard user={currentUser} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          منشوراتي
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : // إذا لم تكن هناك منشورات، اعرض رسالة لطيفة
        reflections.length > 0 ? (
          <ReflectionList items={reflections} />
        ) : (
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            لم تقم بنشر أي شيء بعد.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
