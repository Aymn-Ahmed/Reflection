// src/features/reflections/components/AddReflectionForm.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';

const AddReflectionForm = ({ onSubmit, loading, error }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!content.trim()) return; // لا تسمح بإرسال محتوى فارغ
    onSubmit({ content });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
      <TextField
        label="بماذا تفكر؟"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ position: 'relative' }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading || !content.trim()}
          sx={{ mt: 2 }}
        >
          نشر التأمل
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default AddReflectionForm;
