import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

const ReflectionForm = ({ onSubmit }) => {
  const [type, setType] = useState("ayah");
  const [source, setSource] = useState("");
  const [content, setContent] = useState("");

  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReflection = {
      id: Date.now(),
      type,
      source,
      content,
      createdAt: new Date(),
      user: {
        id: user?.id,
        name: user?.name || "مستخدم",
        avatar: user?.avatar || null,
      },
    };
    if (onSubmit) onSubmit(newReflection);
    setSource("");
    setContent("");
    setType("ayah");
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}>
      <CardHeader
        title="إضافة تأمل جديد"
        sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
      />
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            select
            label="نوع المصدر"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            <MenuItem value="ayah">آية</MenuItem>
            <MenuItem value="hadith">حديث</MenuItem>
          </TextField>

          <TextField
            label={type === "ayah" ? "الآية" : "الحديث"}
            multiline
            rows={2}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            fullWidth
          />

          <TextField
            label="تأملك الخاص"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
          />

          <Button variant="contained" color="success" type="submit">
            نشر
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReflectionForm;
