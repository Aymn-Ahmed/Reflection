// src/components/dialogs/LikesDialog.jsx

import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, List, ListItem,
  ListItemAvatar, Avatar, ListItemText, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const LikesDialog = ({ open, onClose, likes = [] }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        المعجبوند
               <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {likes.length === 0 ? (
          <Typography textAlign="center" p={2}>لا توجد إعجابات بعد.</Typography>
        ) : (
          <List>
            {likes.map((user) => (
              <ListItem 
                key={user.id} 
                button 
                component={Link} 
                to={`/users/${user.id}`}
                onClick={onClose}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LikesDialog;
