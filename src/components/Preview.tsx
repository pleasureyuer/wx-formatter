import React from 'react';
import { Box, Typography } from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useAppContext } from '../store/AppContext';

/**
 * Preview - Phone simulation preview area.
 * Renders formatted HTML inside a 375px width phone frame.
 * Supports multiple preview themes.
 */
const Preview: React.FC = () => {
  const { state } = useAppContext();
  const themeClass = `theme-${state.previewTheme || 'wechat'}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Preview header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 0.5,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
          minHeight: '36px',
        }}
      >
        <SmartphoneIcon sx={{ fontSize: 16, color: '#888', mr: 1 }} />
        <Typography variant="body2" sx={{ color: '#888', fontSize: '12px' }}>
          手机预览
        </Typography>
      </Box>

      {/* Phone frame */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'auto',
          py: 2,
          backgroundColor: '#f0f0f0',
        }}
      >
        <div className={`phone-frame ${themeClass}`}>
          <div className="phone-screen">
            <div
              className={`preview-container ${themeClass}`}
              dangerouslySetInnerHTML={{ __html: state.formattedHtml }}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Preview;
