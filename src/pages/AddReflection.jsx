// AddReflection.jsx
import React from "react";
import { Box } from "@mui/material";
import ReflectionForm from "../features/reflections/components/ReflectionForm";
import { useNavigate } from "react-router-dom";
import { createReflection } from "../features/reflections/api/reflectionAPI"; // ✅ تم الاستيراد
import { useAuth } from "../context/AuthContext";
const AddReflection = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleAdd = (reflection) => {
    if (createReflection(reflection, currentUser)) {
      // ✅ استخدام الخدمة
      console.log("Reflection created:", reflection);
      console.log("Current User:", currentUser);
      navigate("/"); // ✅ توجيه بعد الحفظ
    } else {
      console.error("Failed to create reflection");
    }
    // إعادة تعيين النموذج أو تنفيذ أي منطق آخر بعد الإضافة الناجحة
  };

  return (
    <Box sx={{ p: 3 }}>
      <ReflectionForm onSubmit={handleAdd} />
    </Box>
  );
};

export default AddReflection;
