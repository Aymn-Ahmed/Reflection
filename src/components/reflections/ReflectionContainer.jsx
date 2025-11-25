// src/components/reflections/ReflectionContainer.jsx

import React from 'react';
import { useAuth } from '../../context/AuthContext'; // لاستخدامه في تحديد المالك والإعجاب
import ReflectionCard from './ReflectionCard'; // مكون العرض

export const ReflectionContainer = ({ reflection, onAction }) => {
  console.log(`[ReflectionContainer for ID: ${reflection.id}] onAction is:`, onAction);
  const { currentUser } = useAuth();
  


  // إذا لم يكن هناك منشور أو مستخدم، لا تعرض شيئاً لتجنب الأخطاء
  if (!reflection || !currentUser) {
    return null;
  }

 

  const isOwner = currentUser.uid === reflection.author?.uid;
  const isLiked = reflection.likes?.includes(currentUser.uid);


  // ✅✅✅ تأكد من أن هذه الدالة تبدو هكذا بالضبط ✅✅✅
  const handleLike = () => {
    // حساب مصفوفة الإعجابات الجديدة
    let updatedLikes;

    if (isLiked) {
      // إلغاء الإعجاب
      updatedLikes = reflection.likes.filter(uid => uid !== currentUser.uid);
    } else {
      // إضافة إعجاب
      updatedLikes = [...(reflection.likes || []), currentUser.uid];
    }

    // إنشاء نسخة محدثة من التأمل
    const updatedReflection = {
      ...reflection,
      likes: updatedLikes,
    };

    // إرسال التأمل المحدث بالكامل إلى الـ reducer
    onAction({
      type: 'UPDATE', // <-- الـ Reducer يفهم هذا النوع
      payload: updatedReflection,
    });
  };

  const handleRepost = () => {
    onAction({
      type: 'ADD', // أو 'REPOST'
      payload: { type: 'repost', original: reflection, user: currentUser }
    });
  };

  const handleShare = () => {
    // منطق المشاركة (مثلاً، نسخ الرابط)
    navigator.clipboard.writeText(`${window.location.origin}/reflections/${reflection.id}`);
    alert('تم نسخ الرابط!');
  };

  const handleDelete = () => {
    if (isOwner) {
      onAction({
        type: 'DELETE',
        payload: { id: reflection.id }
      });
    }
  };

  return (
    <ReflectionCard
      reflection={reflection}
      // تمرير البيانات المحسوبة
      isOwner={isOwner}
      isLiked={isLiked}
      // تمرير الدوال الوسيطة
      onLike={handleLike}
      onRepost={handleRepost}
      onShare={handleShare}
      onDelete={handleDelete} // سيتم عرض زر الحذف فقط إذا كانت isOwner صحيحة داخل ReflectionCard
      // تمرير الأعداد مباشرة من المنشور
      likesCount={reflection.likes?.length || 0}
      commentsCount={reflection.commentsCount || 0}
      repostsCount={reflection.repostsCount || 0}
    />
    
  );
};
