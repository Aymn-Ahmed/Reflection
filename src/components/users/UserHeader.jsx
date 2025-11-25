// components/UserHeader.jsx
import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// أو '../features/users/ImageUploader' حسب موقع الملف


const UserHeader = ({ user, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("ar-EG", {
    year: "numeric", month: "short", day: "numeric"
  });

  const avatar = user?.avatar;
  const name = user?.name || "لا يوجد اسم";

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Link to={`/users/${user?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Avatar src={avatar} alt={name} sx={{ width: 40, height: 40, bgcolor: !avatar ? "#ccc" : undefined }}>
          {!avatar && name.charAt(0)}
        </Avatar>
      </Link>
      <Box>
        <Link to={`/users/${user?.id}`} style={{ textDecoration: "none" }}>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            {name}
          </Typography>
        </Link>
        <Typography variant="caption" color="text.secondary">{formattedDate}</Typography>
      </Box>
    </Stack>
  );
};

export default UserHeader;
