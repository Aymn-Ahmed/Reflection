// src/pages/ReflectionDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Alert, Box, Divider, Typography } from '@mui/material';

// --- 1. استيراد دوال الـ API الصحيحة ---
import { fetchReflectionById } from '../features/reflections/api/reflectionAPI';
import { fetchComments, createComment } from '../features/comments/api/commentAPI';
import { useAuth } from '../context/AuthContext';

// --- 2. استيراد المكونات اللازمة ---
import ReflectionCard from '../components/reflections/ReflectionCard';
import CommentSection from '../features/comments/components/CommentSection';

const ReflectionDetails = () => {
  const { reflectionId } = useParams();
  const { currentUser } = useAuth(); // للحصول على المستخدم الحالي لإضافته للتعليق

  const [reflection, setReflection] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!reflectionId) return; // حماية إضافية

      try {
        setLoading(true);
        setError(null);

        // --- 3. استدعاء دوال الـ API الصحيحة داخل Promise.all ---
        const [reflectionData, commentsData] = await Promise.all([
          fetchReflectionById(reflectionId),
          fetchComments(reflectionId)
        ]);
        
        if (!reflectionData) {
          throw new Error("المنشور غير موجود أو تم حذفه.");
        }

        setReflection(reflectionData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [reflectionId]); // الاعتماد على reflectionId فقط

  // --- 4. تصحيح منطق إضافة تعليق جديد ---
  const handleAddComment = async (commentContent) => {
    if (!currentUser) {
      alert("يجب تسجيل الدخول للتعليق.");
      return;
    }

    try {
      const newComment = await createComment(reflectionId, commentContent, currentUser);
      // تحديث قائمة التعليقات فوراً لعرض التعليق الجديد
      setComments(prev => [newComment, ...prev]);
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert("فشل إضافة التعليق.");
    }
  };

  // --- 5. تحسين عرض حالات التحميل والخطأ ---
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  }

  // لا حاجة لهذا الشرط، لأن الخطأ سيعالجه
  // if (!reflection) return <Container sx={{ py: 4 }}><Alert severity="info">المنشور غير موجود.</Alert></Container>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* 6. تمرير props صحيحة إلى ReflectionCard */}
      {/* بما أننا في صفحة التفاصيل، قد لا نحتاج لكل التفاعلات المعقدة */}
      {console.log('this is the reflection in tht reflectionDetails')}
      {console.log(reflection)}
      <ReflectionCard reflection={reflection} onAction={() => {}} />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>التعليقات</Typography>
      
      <Box mt={2}>
        <CommentSection 
          initialComments={comments} // تمرير التعليقات الأولية
          onAddComment={handleAddComment} // تمرير دالة الإضافة
        />
      </Box>
    </Container>
  );
};

export default ReflectionDetails;
