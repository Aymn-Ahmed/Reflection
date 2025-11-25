// src/components/reflections/RepostCard.jsx

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Link as RouterLink } from 'react-router-dom';
import ReflectionCard from './ReflectionCard'; // إعادة استخدام بطاقة التأمل العادية لعرض التأمل الأصلي

const RepostCard = ({ repost, onAction }) => {
  // ✅ استخراج البيانات من الأماكن الصحيحة
  const { author, original } = repost;

  // حماية ضد البيانات غير المكتملة
  if (!author || !original) {
    return null;
  }

  return (
    <Box sx={{ mb: 2, backgroundColor: 'grey.50', borderRadius: 2, p: 1.5 }}>
      {/* 1. رأس إعادة النشر: من الذي قام بإعادة النشر */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
        <RepeatIcon sx={{ fontSize: 16, mr: 1 }} />
        <Avatar 
          src={author.avatar} // ✅ استخدام author.avatar
          sx={{ width: 20, height: 20, mr: 1 }} 
        />
        <Typography variant="caption" fontWeight="bold">
          <RouterLink 
            to={`/users/${author.uid}`} // ✅ استخدام author.uid
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {author.name} {/* ✅ استخدام author.name */}
          </RouterLink>
          &nbsp;أعاد النشر
        </Typography>
      </Box>

   
<ReflectionCard
  reflection={original}
  isOwner={false} 
  isLiked={original.likes?.includes(author.uid)}
   onLike={() => console.log("Like on a reposted item is not implemented yet.")}
  onRepost={() => {}}
  onShare={() => {}}
  onDelete={() => {}}
  likesCount={original.likes?.length || 0}
  commentsCount={original.comments?.length || 0}
  repostsCount={original.repostsCount || 0}
/>
    </Box>
  );
};

export default RepostCard;
