// src/components/reflections/ReflectionContainer.jsx

import React from "react";
import { useAuth } from "../../context/AuthContext";
import ReflectionCard from "./ReflectionCard";

export const ReflectionContainer = ({ reflection, onAction }) => {
  const { currentUser } = useAuth();

  // إذا لم يكن هناك منشور أو مستخدم، لا تعرض شيئاً لتجنب الأخطاء
  if (!reflection || !currentUser) {
    return null;
  }

  // --- حساب الحالات المشتقة (Derived State) ---
  const isOwner = currentUser.id === reflection.author?.id;
  const isLiked = reflection.likes?.includes(currentUser.id);

  // --- دوال وسيطة لاستدعاء onAction ---

  const handleLike = () => {
    onAction({
      type: "TOGGLE_LIKE",
      payload: {
        reflectionId: reflection.id,
        userId: currentUser.id,
      },
    });
  };

  const handleRepost = () => {
    // منطق إعادة النشر يمكن أن يكون معقداً، سنقوم بتبسيطه الآن
    // هو يضيف منشوراً جديداً من نوع 'repost'
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
        original: reflection,
      },
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/reflections/${reflection.id}`
    );
    alert("تم نسخ الرابط!");
  };

  const handleDelete = () => {
    if (isOwner) {
      onAction({
        type: "DELETE",
        payload: { id: reflection.id },
      });
    }
  };

  return (
    <ReflectionCard
      reflection={reflection}
      isOwner={isOwner}
      isLiked={isLiked}
      // ✅✅✅ التصحيح هنا ✅✅✅
      onLike={handleLike}
      onRepost={handleRepost}
      onShare={handleShare}
      onDelete={handleDelete}
      likesCount={reflection.likes?.length || 0}
      commentsCount={reflection.comments?.length || 0}
      repostsCount={reflection.repostsCount || 0}
    />
  );
};
