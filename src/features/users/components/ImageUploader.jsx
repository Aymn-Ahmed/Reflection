import React, { useRef } from 'react';
import { Box, Avatar, IconButton, Badge } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

/**
 * مكون لرفع وتغيير الصورة الرمزية.
 * @param {string} currentImage - رابط الصورة الحالية.
 * @param {function} onImageUpload - دالة تُستدعى عند اختيار صورة جديدة.
 */
const ImageUploader = ({ currentImage, onImageUpload }) => {
  // useRef للوصول إلى حقل إدخال الملف المخفي
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    // محاكاة النقر على حقل الإدخال عند الضغط على الأيقونة
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // في تطبيق حقيقي، ستقوم برفع الملف إلى سيرفر هنا
      // وتحصل على رابط جديد.
      // في المحاكاة، سنستخدم رابطاً عشوائياً جديداً.
      const newImageUrl = `https://i.pravatar.cc/150?t=${Date.now( )}`;
      onImageUpload(newImageUrl);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: 150, height: 150 }}>
      {/* 1. استخدام Badge لوضع أيقونة التعديل فوق الصورة */}
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <IconButton
            onClick={handleIconClick}
            sx={{
              backgroundColor: 'background.paper',
              border: '2px solid',
              borderColor: 'primary.main',
              '&:hover': { backgroundColor: 'grey.200' },
            }}
          >
            <PhotoCamera color="primary" />
          </IconButton>
        }
      >
        {/* 2. Avatar لعرض الصورة بشكل دائري وبحجم ثابت */}
        <Avatar
          src={currentImage}
          sx={{
            width: 150,
            height: 150,
            border: '3px solid',
            borderColor: 'grey.300',
            // 3. هذا هو الجزء السحري للتحكم في حجم الصورة
            '& .MuiAvatar-img': {
              objectFit: 'cover', // تملأ الدائرة دون تشويه
            },
          }}
        >
          {/* حرف يظهر إذا لم تكن هناك صورة */}
          U
        </Avatar>
      </Badge>

      {/* 4. حقل إدخال الملف المخفي */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/gif" // تحديد أنواع الملفات المسموح بها
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default ImageUploader;
