import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '../store/AppContext';

/**
 * StatusBar - Bottom status bar showing word count and status info.
 */
const StatusBar: React.FC = () => {
  const { state } = useAppContext();

  const charCount = state.markdown.length;
  const lineCount = state.markdown ? state.markdown.split('\n').length : 0;
  const wordCount = state.markdown
    ? state.markdown.replace(/\s+/g, ' ').trim().split(' ').length
    : 0;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 0.5,
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fafafa',
        minHeight: '24px',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="caption" sx={{ color: '#999' }}>
          字符: {charCount}
        </Typography>
        <Typography variant="caption" sx={{ color: '#999' }}>
          行数: {lineCount}
        </Typography>
        <Typography variant="caption" sx={{ color: '#999' }}>
          词数: {wordCount}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {state.errorMessage && (
          <Typography variant="caption" sx={{ color: '#d32f2f' }}>
            {state.errorMessage}
          </Typography>
        )}
        {state.isPushing && (
          <Typography variant="caption" sx={{ color: '#1976d2' }}>
            推送中...
          </Typography>
        )}
        <Typography variant="caption" sx={{ color: '#999' }}>
          wx-formatter v1.0
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusBar;
