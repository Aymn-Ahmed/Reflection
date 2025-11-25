// src/components/reflections/InteractionButtons.jsx

import React, { useState } from 'react';
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
// لا نحتاج زر الحذف هنا، فهو موجود في قائمة الإعدادات في ReflectionCard

import LikesDialog from '../dialogs/LikesDialog'; // تأكد من صحة المسار

const InteractionButtons = ({
  onLike,
  onRepost,
  onShare,
  onCommentClick,
  isLiked,
  likesCount, // ✅ الاعتماد على العدد الجاهز
  commentsCount,
  repostsCount,
}) => {
  const [likesDialogOpen, setLikesDialogOpen] = useState(false);

  // ✅ دوال المعالجة أصبحت أبسط. هي فقط تستدعي الـ props.
  const handleLikeClick = () => onLike();
  const handleRepostClick = () => onRepost();
  const handleShareClick = () => onShare();
  
  return (
    <>
      <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ px: 1 }}>
        {/* زر التعليقات */}
        <Tooltip title="التعليقات" arrow>
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={onCommentClick}>
            <IconButton aria-label="comment">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {commentsCount > 0 ? commentsCount : ""}
            </Typography>
          </Box>
        </Tooltip>

        {/* زر إعادة النشر */}
        <Tooltip title="إعادة النشر" arrow>
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleRepostClick}>
            <IconButton aria-label="repost">
              <RepeatIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {repostsCount > 0 ? repostsCount : ""}
            </Typography>
          </Box>
        </Tooltip>

        {/* زر الإعجاب */}
        <Tooltip title={isLiked ? "إلغاء الإعجاب" : "إعجاب"} arrow>
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
            <IconButton aria-label="like" color={isLiked ? "error" : "default"} onClick={handleLikeClick}>
              {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
            <Typography 
              variant="body2"
              color={isLiked ? "error.main" : "text.secondary"}
              onClick={() => likesCount > 0 && setLikesDialogOpen(true)}
              sx={{
                cursor: likesCount > 0 ? 'pointer' : 'default',
                '&:hover': {
                  textDecoration: likesCount > 0 ? 'underline' : 'none',
                },
              }}
            >
              {likesCount > 0 ? likesCount : ""}
            </Typography>
          </Box>
        </Tooltip>

        {/* زر المشاركة */}
        <Tooltip title="مشاركة" arrow>
          <IconButton aria-label="share" onClick={handleShareClick}>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        {/* ❌ تم حذف زر الحذف من هنا لأنه موجود في قائمة الإعدادات */}
      </Box>

      <LikesDialog 
        open={likesDialogOpen}
        onClose={() => setLikesDialogOpen(false)}
        reflectionId={null} // تحتاج إلى طريقة لتمرير ID التأمل هنا
      />
    </>
  );
};

export default InteractionButtons;
