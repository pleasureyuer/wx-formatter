import React from 'react';
import { Box, IconButton, Tooltip, Divider } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';

/** Toolbar button action */
interface ToolbarAction {
  icon: React.ReactNode;
  label: string;
  before: string;
  after: string;
}

/** EditorToolbar props */
interface EditorToolbarProps {
  onInsert: (before: string, after: string) => void;
}

/** Available toolbar actions */
const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { icon: <FormatBoldIcon fontSize="small" />, label: '加粗', before: '**', after: '**' },
  { icon: <FormatItalicIcon fontSize="small" />, label: '斜体', before: '*', after: '*' },
  { icon: <TitleIcon fontSize="small" />, label: '一级标题', before: '# ', after: '' },
  { icon: <TitleIcon fontSize="small" sx={{ fontSize: 16 }} />, label: '二级标题', before: '## ', after: '' },
  { icon: <FormatListBulletedIcon fontSize="small" />, label: '无序列表', before: '- ', after: '' },
  { icon: <FormatListNumberedIcon fontSize="small" />, label: '有序列表', before: '1. ', after: '' },
  { icon: <FormatQuoteIcon fontSize="small" />, label: '引用', before: '> ', after: '' },
  { icon: <HorizontalRuleIcon fontSize="small" />, label: '分割线', before: '\n---\n', after: '' },
  { icon: <CodeIcon fontSize="small" />, label: '行内代码', before: '`', after: '`' },
  { icon: <LinkIcon fontSize="small" />, label: '链接', before: '[', after: '](url)' },
  { icon: <ImageIcon fontSize="small" />, label: '图片', before: '![', after: '](url)' },
];

/**
 * EditorToolbar - Provides quick formatting buttons for the editor.
 */
const EditorToolbar: React.FC<EditorToolbarProps> = ({ onInsert }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 1,
        py: 0.5,
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fafafa',
        gap: 0,
        flexWrap: 'wrap',
        minHeight: '36px',
      }}
    >
      {TOOLBAR_ACTIONS.map((action, index) => (
        <React.Fragment key={action.label}>
          {index === 2 && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 20 }} />}
          {index === 4 && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 20 }} />}
          {index === 7 && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 20 }} />}
          {index === 9 && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 20 }} />}
          <Tooltip title={action.label} arrow>
            <IconButton
              size="small"
              onClick={() => onInsert(action.before, action.after)}
              sx={{ color: '#555', p: 0.5 }}
            >
              {action.icon}
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default EditorToolbar;
