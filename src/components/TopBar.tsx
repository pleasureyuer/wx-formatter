import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import TemplateSelector from './TemplateSelector';
import CopyButton from './CopyButton';
import { useAppContext } from '../store/AppContext';
import { AppActionType } from '../store/actions';

/**
 * TopBar - Top navigation bar with logo, template selector, and action buttons.
 */
const TopBar: React.FC = () => {
  const { dispatch } = useAppContext();

  const handleOpenPushDialog = (): void => {
    dispatch({ type: AppActionType.TOGGLE_PUSH_DIALOG, payload: true });
  };

  const handleOpenConfigDialog = (): void => {
    dispatch({ type: AppActionType.TOGGLE_CONFIG_DIALOG, payload: true });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        color: '#333333',
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: '48px !important', px: 2 }}>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '16px',
            color: '#1976d2',
            mr: 3,
            whiteSpace: 'nowrap',
          }}
        >
          公众号排版助手
        </Typography>

        {/* Template selector */}
        <Box sx={{ mr: 2 }}>
          <TemplateSelector />
        </Box>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CopyButton />

          <Tooltip title="推送到草稿箱">
            <IconButton
              size="small"
              onClick={handleOpenPushDialog}
              sx={{ color: '#1976d2', ml: 1 }}
            >
              <CloudUploadIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="API 配置">
            <IconButton
              size="small"
              onClick={handleOpenConfigDialog}
              sx={{ color: '#666666' }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
