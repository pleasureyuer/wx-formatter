import React from 'react';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import Editor from './Editor';
import Preview from './Preview';
import StatusBar from './StatusBar';
import PushDialog from './PushDialog';
import ConfigDialog from './ConfigDialog';
import '../styles/preview.css';

/**
 * Layout - Main application layout.
 * Top bar + split editor/preview + status bar.
 */
const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top navigation bar */}
      <TopBar />

      {/* Main content area: editor + preview */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Editor panel */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #e0e0e0' }}>
          <Editor />
        </Box>

        {/* Preview panel */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
          <Preview />
        </Box>
      </Box>

      {/* Status bar */}
      <StatusBar />

      {/* Dialogs */}
      <PushDialog />
      <ConfigDialog />
    </Box>
  );
};

export default Layout;
