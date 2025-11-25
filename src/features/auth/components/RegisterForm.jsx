// src/features/auth/components/RegisterForm.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';

const RegisterForm = ({ onSubmit, error, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // تمرير كل البيانات إلى المكون الأب للتحقق منها
    onSubmit({ name, email, password, confirmPassword });
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
        إنشاء حساب جديد
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
        
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <TextField
          margin="normal"
          required
          fullWidth
          label="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="تأكيد كلمة المرور"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            إنشاء الحساب
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
          لديك حساب بالفعل؟{' '}
          <a href="/login" style={{ color: 'inherit' }}>
            تسجيل الدخول
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
