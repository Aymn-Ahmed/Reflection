import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext"; // لاستخدامه في زر "تعديل الملف الشخصي"
import { useNavigate } from "react-router-dom"; // استيراد useNavigate

// المكون يستقبل كائن المستخدم كـ prop
const ProfileCard = ({ user }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // استخدام useNavigate

  // التحقق للتأكد من أن بيانات المستخدم موجودة قبل محاولة عرضها
  if (!user) {
    return null; // لا تعرض أي شيء إذا لم يتم تمرير المستخدم
  }

  // التحقق مما إذا كانت هذه البطاقة تعرض ملف المستخدم المسجل دخوله حالياً
  const isCurrentUserProfile = currentUser && currentUser.id === user.id;

  return (
    <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* 1. الصورة الرمزية (Avatar) */}
          <Avatar
            src={user.avatar} // استخدم الصورة من بيانات المستخدم
            alt={user.name} // نص بديل للصورة
            sx={{
              width: 120,
              height: 120,
              mb: 2, // margin-bottom
              border: "4px solid",
              borderColor: "primary.main",
            }}
          >
            {/* حرف من الاسم في حال عدم وجود صورة */}
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </Avatar>

          {/* 2. اسم المستخدم */}
          <Typography variant="h5" component="h2" fontWeight="bold">
            {user.name || "مستخدم غير معروف"}
          </Typography>

          {/* 3. البريد الإلكتروني (أو نبذة تعريفية) */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {user.email || ""}
          </Typography>

          {/* 4. زر تعديل الملف الشخصي (يظهر فقط إذا كان هذا ملف المستخدم الحالي) */}
          {isCurrentUserProfile && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/profile/edit")} // يمكنك إضافة هذا لاحقاً
            >
              تعديل الملف الشخصي
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
