// src/features/auth/components/LoginForm.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';

const LoginForm = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        borderRadius: 2,
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <Typography component="h1" variant="h5">
        تسجيل الدخول
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
        
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <TextField
          margin="normal"
          required
          fullWidth
          label="البريد الإلكتروني"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="كلمة المرور"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <Box sx={{ position: 'relative' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            تسجيل الدخول
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
        
        <Typography variant="body2" align="center">
          ليس لديك حساب؟{' '}
          <a href="/register" style={{ color: 'inherit' }}>
            إنشاء حساب
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
