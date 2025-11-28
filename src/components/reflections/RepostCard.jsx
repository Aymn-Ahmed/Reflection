// src/components/reflections/RepostCard.jsx

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Link as RouterLink } from "react-router-dom";
import ReflectionCard from "./ReflectionCard";
import { useAuth } from "../../context/AuthContext"; // ✅ استيراد useAuth للوصول إلى currentUser

const RepostCard = ({ repost, onAction }) => {
  const { currentUser } = useAuth(); // ✅ الحصول على المستخدم الحالي
  const { author, original } = repost;

  if (!author || !original || !currentUser) {
    return null;
  }

  // --- دوال وسيطة لمعالجة التفاعل مع التأمل الأصلي ---

  const handleLikeOnOriginal = () => {
    onAction({
      type: "TOGGLE_LIKE",
      payload: {
        reflectionId: original.id,
        userId: currentUser.id,
      },
    });
  };

  const handleRepostOnOriginal = () => {
    onAction({
      type: "ADD",
      payload: {
        id: `repost-${Date.now()}`,
        type: "repost",
        author: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        createdAt: new Date().toISOString(),
        original: original, // إعادة نشر التأمل الأصلي مرة أخرى
      },
    });
  };

  const handleShareOnOriginal = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/reflections/${original.id}`
    );
    alert("تم نسخ رابط التأمل الأصلي!");
  };

  return (
    <Box sx={{ mb: 2, backgroundColor: "grey.50", borderRadius: 2, p: 1.5 }}>
      {/* رأس إعادة النشر */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          color: "text.secondary",
        }}
      >
        <RepeatIcon sx={{ fontSize: 16, mr: 1 }} />
        <Avatar src={author.avatar} sx={{ width: 20, height: 20, mr: 1 }} />
        <Typography variant="caption" fontWeight="bold">
          <RouterLink
            to={`/users/${author.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {author.name}
          </RouterLink>
          &nbsp;أعاد النشر
        </Typography>
      </Box>

      {/* عرض التأمل الأصلي مع تمرير الدوال الوسيطة الصحيحة */}
      <ReflectionCard
        reflection={original}
        isOwner={false} // لا يمكنك تعديل أو حذف التأمل الأصلي من هنا
        isLiked={original.likes?.includes(currentUser.id)}
        // ✅✅✅ تفعيل كل الأزرار ✅✅✅
        onLike={handleLikeOnOriginal}
        onRepost={handleRepostOnOriginal}
        onShare={handleShareOnOriginal}
        onDelete={() => {}} // لا يمكن الحذف من هنا
        likesCount={original.likes?.length || 0}
        commentsCount={original.comments?.length || 0}
        repostsCount={original.repostsCount || 0}
      />
    </Box>
  );
};

export default RepostCard;
