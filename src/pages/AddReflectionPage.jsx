// src/pages/AddReflectionPage.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { createReflection } from "../features/reflections/api/reflectionAPI";

// استيراد أيقونات الوسائط
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import PollIcon from "@mui/icons-material/Poll";
import GifBoxIcon from "@mui/icons-material/GifBox";

const AddReflectionPage = () => {
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // للحصول على النص المنقول من المكون المنبثق

  // الحالة الأولية للنص قد تأتي من المكون السابق
  const [content, setContent] = useState(location.state?.initialContent || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (!content.trim() || !currentUser) return;

    setIsSubmitting(true);
    try {
      // لاحقاً، سنضيف هنا منطق رفع الصور/الفيديو
      const reflectionData = { content };
      await createReflection(reflectionData, currentUser);
      navigate("/"); // توجيه المستخدم للصفحة الرئيسية بعد النشر
    } catch (error) {
      console.error("Failed to create reflection:", error);
      // يمكنك عرض رسالة خطأ هنا
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return <Typography>الرجاء تسجيل الدخول للنشر.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          إنشاء تدبر جديد
        </Typography>
        <Box display="flex" width="100%">
          <Avatar src={currentUser.avatar} sx={{ mt: 1, mr: 2 }} />
          <TextField
            fullWidth
            multiline
            rows={8} // مساحة أكبر للكتابة
            variant="outlined"
            placeholder="بم تفكر؟"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // إزالة الحدود لمظهر أنظف
                },
              },
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          {/* --- أزرار إضافة الوسائط (واجهة فقط حالياً) --- */}
          <Box>
            <IconButton color="primary" aria-label="add image">
              <ImageIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add video">
              <VideocamIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add poll">
              <PollIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add gif">
              <GifBoxIcon />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            color="success"
            onClick={handlePost}
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? "جاري النشر..." : "نشر"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddReflectionPage;
