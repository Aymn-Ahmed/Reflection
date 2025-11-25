// src/features/reflections/components/ReflectionFeed.jsx

import React, { useEffect, useReducer, useState } from "react";
import { fetchReflections } from "../api/reflectionAPI";
import ReflectionList from "../../../components/reflections/ReflectionList";
import { Box, CircularProgress, Typography } from "@mui/material";

// تعريف أنواع الإجراءات لتجنب الأخطاء الإملائية (تطبيقاً لفكرتك)
const ACTION_TYPES = {
  SET_DATA: 'SET_DATA',
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

function feedReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_DATA:
      return action.payload;
    case ACTION_TYPES.ADD:
      return [action.payload, ...state];
    case ACTION_TYPES.UPDATE:
      return state.map((item) => {
        if (item.type === "repost" && item.original.id === action.payload.id) {
          return { ...item, original: action.payload };
        }
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    case ACTION_TYPES.DELETE:
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
