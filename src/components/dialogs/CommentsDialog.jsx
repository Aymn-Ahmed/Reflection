// src/features/comments/dialogs/CommentsDialog.jsx

import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress, Alert, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { fetchComments, createComment } from '../../features/comments/api/commentAPI';

// src\features\comments\api
const CommentsDialog = ({ open, onClose, reflectionId }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    // جلب التعليقات فقط عندما يتم فتح النافذة
    if (open) {
      const loadComments = async () => {
        setLoading(true);
        setError(null);
        try {
          const commentsData = await fetchComments(reflectionId);
          setComments(commentsData);
        } catch (err) {
          setError(err+ "       "+"فشل تحميل التعليقات.");
        } finally {
          setLoading(false);
        }
      };
      loadComments();
    }
  }, [open, reflectionId]); // يعتمد على `open`

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setIsSubmitting(true);
    try {
      const addedComment = await createComment(reflectionId, newComment, currentUser);
      setComments(prev => [addedComment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>التعليقات</DialogTitle>
      <DialogContent dividers>
        {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <>
            {/* نموذج إضافة تعليق */}
            {currentUser && (
                <Box component="form" onSubmit={handleAddComment} sx={{ mb: 2 }}>
                  <TextField fullWidth variant="outlined" label="أضف تعليقاً..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <Button type="submit" disabled={isSubmitting} sx={{ mt: 1 }}>نشر</Button>
              </Box>
            )}

            {/* قائمة التعليقات */}
            <List>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar><Avatar alt={comment.user.name} src={comment.user.avatar} /></ListItemAvatar>
                      <ListItemText primary={comment.user.name} secondary={comment.content} />
                    </ListItem>
                    {index < comments.length - 1 && <Divider variant="inset" />}
                  </React.Fragment>
                ))
              ) : (
                <Typography color="text.secondary">لا توجد تعليقات.</Typography>
              )}
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إغلاق</Button>
      </DialogActions>
    </Dialog>
  );
  

};

export default CommentsDialog;
