// src/pages/EditProfilePage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../features/users/api/userAPI";
import { formatUserForApi } from "../features/users/utils/userMappers";

// افترض أن لديك مكوناً لرفع الصور بهذا الاسم
import ImageUploader from "../features/users/components/ImageUploader";
const EditProfilePage = () => {
  const { currentUser, updateUserState } = useAuth(); // نحتاج updateUserState  لتحديث السياق
  const navigate = useNavigate();

  // حالة لتخزين بيانات النموذج
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    // bio: '' // يمكنك إضافة هذا لاحقاً
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 4. تعبئة النموذج بالبيانات الحالية عند تحميل الصفحة
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setFormData({
      ...formData,
      avatar: newAvatarUrl,
    });
  };

  // 5. تنفيذ عملية الحفظ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiData = formatUserForApi(formData);

      const updatedUserFromApi = await updateUser(currentUser.id, apiData);

      // 6. تحديث الحالة العامة في AuthContext
      updateUserState(updatedUserFromApi);

      navigate("/profile"); // توجيه المستخدم لملفه الشخصي بعد الحفظ
    } catch (err) {
      setError("فشل تحديث الملف الشخصي. الرجاء المحاولة مرة أخرى.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return <Typography>يجب تسجيل الدخول لتعديل الملف الشخصي.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{ p: 4, borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          تعديل الملف الشخصي
        </Typography>

        {/* 3. مكون رفع الصورة */}
        {/* اريد عندما اضيف صوره تكون مناسبه في الحجم يعني ما ت صبح ملئ الشاشه او الصفحه */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ImageUploader
            currentImage={!formData.avatar ? "" : formData.avatar}
            onImageUpload={handleAvatarChange}
          />
        </Box>

        {/* حقل تعديل الاسم */}
        <TextField
          fullWidth
          label="الاسم"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* أزرار التحكم */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}
        >
          <Button onClick={() => navigate("/profile")} color="secondary">
            إلغاء
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "حفظ التغييرات"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfilePage;
