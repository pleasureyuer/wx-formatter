import React from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import { useAppContext } from '../store/AppContext';
import { AppActionType } from '../store/actions';

/**
 * 主题配色方案定义
 */
export interface ThemeOption {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  colors: {
    primary: string;
    bg: string;
  };
}

export const THEME_LIST: ThemeOption[] = [
  {
    id: 'wechat',
    name: '微信绿',
    emoji: '💚',
    desc: '经典微信绿，清新自然',
    colors: { primary: '#07C160', bg: '#ffffff' },
  },
  {
    id: 'zhihu',
    name: '知乎蓝',
    emoji: '💙',
    desc: '知乎专业蓝，冷静克制',
    colors: { primary: '#0066FF', bg: '#ffffff' },
  },
  {
    id: 'xiaohongshu',
    name: '小红书粉',
    emoji: '💗',
    desc: '小红书粉，活泼温暖',
    colors: { primary: '#FF2442', bg: '#ffffff' },
  },
  {
    id: 'dark',
    name: '深色模式',
    emoji: '🌙',
    desc: '深色护眼，夜间阅读',
    colors: { primary: '#07C160', bg: '#1a1a1a' },
  },
  {
    id: 'minimal',
    name: '简约黑白',
    emoji: '🖤',
    desc: '黑白极简，杂志风格',
    colors: { primary: '#333333', bg: '#ffffff' },
  },
];

const ThemeSelector: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const currentTheme = state.previewTheme || 'wechat';

  const handleThemeChange = (themeId: string) => {
    dispatch({ type: AppActionType.SET_PREVIEW_THEME, payload: themeId });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
      <Typography variant="caption" color="textSecondary" sx={{ mr: 0.5, fontSize: '11px' }}>
        配色：
      </Typography>
      {THEME_LIST.map((theme) => (
        <Tooltip key={theme.id} title={theme.desc} arrow>
          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <span style={{ fontSize: '12px' }}>{theme.emoji}</span>
                <span style={{ fontSize: '11px' }}>{theme.name}</span>
              </Box>
            }
            size="small"
            clickable
            color={currentTheme === theme.id ? 'primary' : 'default'}
            variant={currentTheme === theme.id ? 'filled' : 'outlined'}
            onClick={() => handleThemeChange(theme.id)}
            sx={{
              height: '24px',
              '& .MuiChip-label': { px: 0.8, py: 0 },
              ...(currentTheme === theme.id && {
                backgroundColor: theme.colors.primary + '20',
                borderColor: theme.colors.primary,
                color: theme.colors.primary,
              }),
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
};

export default ThemeSelector;
