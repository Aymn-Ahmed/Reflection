// pages/Home.jsx

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import ReflectionList from "../features/reflections/components/ReflectionList";
import ReflectionFeed from "../features/reflections/components/ReflectionFeed";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">التأملات</Typography>
        <Button variant="contained" color="success" onClick={() => navigate("/add")}>
          + إضافة تأمل
        </Button>
      </Box>
        <ReflectionFeed />
    </Box>
  );
};

export default Home;
