import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { fetchComments, createComment } from "../api/commentAPI"; // ✅ استخدام الخدمة
// import { } from "../../../services/commentsService"; // ✅ استخدام الخدمة
function CommentSection({ reflectionId }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(reflectionId);
        setComments(data || []);
      } catch (err) {
        console.error("خطأ أثناء تحميل التعليقات:", err);
      }
    };

    if (reflectionId) loadComments();
  }, [reflectionId]);

  const handleAddComment = async () => {
    if (!input.trim()) return;

    const newCommentData = {
      // يمكنك إنشاء ID مؤقت هنا إذا احتجت
      id: `temp-${Date.now()}`,
      text: input,
      date: new Date().toLocaleString(),
      // أضف معلومات المستخدم إذا كانت متوفرة
    };

    try {
      // التحديث المتفائل (Optimistic Update):
      // 1. قم بتحديث الواجهة فوراً بالبيانات الجديدة (المؤقتة)
      setComments((prevComments) => [newCommentData, ...prevComments]);
      setInput("");

      // 2. أرسل الطلب إلى الـ API في الخلفية
      await createComment(reflectionId, { text: input }); // أرسل فقط ما يحتاجه الـ API
    } catch (err) {
      console.error("خطأ في إضافة تعليق:", err);
      // في حالة الفشل، يمكنك التراجع عن التحديث المتفائل
      // setComments(prevComments => prevComments.filter(c => c.id !== newCommentData.id));
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1">التعليقات:</Typography>

      {comments.length === 0 && (
        <Typography color="text.secondary" fontSize="14px">
          لا توجد تعليقات بعد.
        </Typography>
      )}

      {comments.map((c, index) => (
        <Box
          key={index}
          sx={{ background: "#f9f9f9", p: 1, my: 1, borderRadius: 1 }}
        >
          <Typography variant="body2">{c.text}</Typography>
          <Typography variant="caption" color="text.secondary">
            {c.date}
          </Typography>
        </Box>
      ))}

      <Box display="flex" gap={1} mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="أضف تعليقًا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleAddComment} variant="contained">
          إضافة
        </Button>
      </Box>
    </Box>
  );
}

export default CommentSection;
