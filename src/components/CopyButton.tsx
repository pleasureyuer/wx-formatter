import React, { useState, useCallback } from 'react';
import { IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppContext } from '../store/AppContext';
import { copyHtml } from '../utils/clipboard';

/**
 * CopyButton - One-click copy button for formatted HTML.
 */
const CopyButton: React.FC = () => {
  const { state } = useAppContext();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState<'success' | 'error'>('success');

  const handleCopy = useCallback(async (): Promise<void> => {
    if (!state.formattedHtml) {
      setSnackMessage('没有可复制的内容');
      setSnackSeverity('error');
      setSnackOpen(true);
      return;
    }

    const success = await copyHtml(state.formattedHtml);
    if (success) {
      setSnackMessage('HTML 已复制到剪贴板');
      setSnackSeverity('success');
    } else {
      setSnackMessage('复制失败，请手动复制');
      setSnackSeverity('error');
    }
    setSnackOpen(true);
  }, [state.formattedHtml]);

  const handleCloseSnack = useCallback((): void => {
    setSnackOpen(false);
  }, []);

  return (
    <>
      <Tooltip title="复制 HTML">
        <IconButton size="small" onClick={handleCopy} sx={{ color: '#1976d2' }}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snackSeverity}
          variant="filled"
          sx={{ py: 0.5, fontSize: '13px' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CopyButton;
