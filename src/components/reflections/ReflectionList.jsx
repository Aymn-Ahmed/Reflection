// src/features/reflections/components/ReflectionList.jsx
import React from 'react';
import { Box } from '@mui/material';
  import {ReflectionContainer} from './ReflectionContainer'; 
import RepostCard from './RepostCard'; 

const ReflectionList = ({ items, onAction }) => {

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
      {items.map((item) => {
        if (item.type === "repost") {
          return (
            <RepostCard
              key={item.id}
              repost={item}
              onAction={onAction}
            />
          );
        } else {
          return (
            <ReflectionContainer
              key={item.id}
              reflection={item}
              onAction={onAction}
            />
          );
        }
      })}
    </Box>
  );
};

export default ReflectionList;
