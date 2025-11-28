// src/features/reflections/components/ReflectionFeed.jsx

import React, { useEffect, useReducer, useState } from "react";
import { fetchReflections } from "../api/reflectionAPI";
import ReflectionList from "../../../components/reflections/ReflectionList";
import { Box, CircularProgress, Typography } from "@mui/material";

// تعريف أنواع الإجراءات لتجنب الأخطاء الإملائية (تطبيقاً لفكرتك)
const ACTION_TYPES = {
  SET_DATA: "SET_DATA",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};
function feedReducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];

    // ✅✅✅ هذا هو المنطق الجديد للإعجاب ✅✅✅
    case "TOGGLE_LIKE": {
      const { reflectionId, userId } = action.payload;
      return state.map((item) => {
        if (item.id === reflectionId) {
          const likes = item.likes || [];
          const isLiked = likes.includes(userId);
          const updatedLikes = isLiked
            ? likes.filter((id) => id !== userId) // إلغاء الإعجاب
            : [...likes, userId]; // إضافة إعجاب
          return { ...item, likes: updatedLikes };
        }
        // تحديث الإعجاب داخل التأمل الأصلي في حالة إعادة النشر
        if (item.type === "repost" && item.original.id === reflectionId) {
          const original = item.original;
          const likes = original.likes || [];
          const isLiked = likes.includes(userId);
          const updatedLikes = isLiked
            ? likes.filter((id) => id !== userId)
            : [...likes, userId];
          return { ...item, original: { ...original, likes: updatedLikes } };
        }
        return item;
      });
    }

    case "DELETE":
      return state.filter((item) => {
        if (item.type === "repost") {
          return item.original.id !== action.payload.id;
        }
        return item.id !== action.payload.id;
      });

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// ... (بقية المكون يبقى كما هو)

const ReflectionFeed = () => {
  const [feedItems, dispatch] = useReducer(feedReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        setLoading(true);
        const data = await fetchReflections();
        dispatch({ type: ACTION_TYPES.SET_DATA, payload: data });
      } catch (err) {
        setError("فشل تحميل البيانات.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadFeed();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>جاري تحميل التأملات...</Typography>
      </Box>
    );
  if (error)
    return (
      <Typography color="error" textAlign="center" mt={5}>
        {error}
      </Typography>
    );
  if (!feedItems || feedItems.length === 0)
    return (
      <Typography color="text.secondary" textAlign="center" mt={5}>
        لا توجد تأملات لعرضها حالياً.
      </Typography>
    );

  return (
    <Box>
      {/* ✅ تم تمرير dispatch إلى ReflectionList لتنفيذ الإجراءات */}
      <ReflectionList items={feedItems} onAction={dispatch} />
    </Box>
  );
};

export default ReflectionFeed;
