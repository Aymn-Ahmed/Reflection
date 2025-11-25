// src/components/reflections/ReflectionCard.jsx

import React, { useState } from 'react';
// ✅ إضافة Link من MUI
import { Card, CardHeader, CardContent, Typography, Avatar, IconButton, Box, Menu, MenuItem, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import CommentsDialog from '../dialogs/CommentsDialog';
import InteractionButtons from './InteractionButtons';

const ReflectionCard = ({ 
  reflection, 
  isOwner,
  isLiked, 
  onLike, 
  onRepost, 
  onShare, 
  onDelete,
  likesCount, 
  commentsCount, 
  repostsCount 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const open = Boolean(anchorEl);

  const { author, content, createdAt, id } = reflection;

  if (!author || !content) {
    return null;
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete();
    handleMenuClose();
  };

  const handleCommentIconClick = () => {
    setCommentsOpen(true);
  };

  return (
    // ❌ تم حذف onClick و cursor و hover من هنا
    <Card sx={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 2, mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar 
            component={RouterLink} 
            to={`/users/${author.uid}`}
            src={author.avatar}
          >
            {author.name?.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          isOwner && (
            <IconButton 
              aria-label="settings" 
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          <Typography 
            component={RouterLink}
            to={`/users/${author.uid}`}
            variant="body1"
            fontWeight="bold"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            {author.name}
          </Typography>
        }
        subheader={
          // ✅ جعل التاريخ رابطاً ينقلك إلى صفحة التفاصيل
          <Link component={RouterLink} to={`/reflections/${id}`} underline="hover" color="inherit">
            {new Date(createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
          </Link>
        }
      />

      <CardContent sx={{ pt: 0, pb: 1 }}>
        {/* ✅ جعل المحتوى هو الرابط الأساسي لصفحة التفاصيل */}
        <Link component={RouterLink} to={`/reflections/${id}`} underline="none" color="inherit">
          <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </Typography>
        </Link>
      </CardContent>

      {/* ✅ هذا الجزء سيعمل الآن بشكل صحيح لأن Card لم يعد يخطف النقرة */}
      <Box sx={{ px: 1, pb: 1 }}>
        <InteractionButtons 
          onLike={onLike}
          onRepost={onRepost}
          onShare={onShare}
          onCommentClick={handleCommentIconClick}
          isLiked={isLiked}
          likesCount={likesCount}
          commentsCount={commentsCount}
          repostsCount={repostsCount} 
        />
      </Box>

      <CommentsDialog
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        reflectionId={id}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          حذف المنشور
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ReflectionCard;
