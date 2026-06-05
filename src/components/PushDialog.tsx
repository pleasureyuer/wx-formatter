import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  type SelectChangeEvent,
} from '@mui/material';
import { useAppContext } from '../store/AppContext';
import { AppActionType } from '../store/actions';
import { pushToDraft } from '../services/api';

/**
 * PushDialog - Dialog for pushing formatted article to WeChat draft.
 */
const PushDialog: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [title, setTitle] = useState('');
  const [digest, setDigest] = useState('');
  const [thumbMediaId, setThumbMediaId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClose = useCallback((): void => {
    dispatch({ type: AppActionType.TOGGLE_PUSH_DIALOG, payload: false });
    setError('');
    setSuccess('');
  }, [dispatch]);

  const handlePush = useCallback(async () => {
    if (!title.trim()) {
      setError('请输入文章标题');
      return;
    }

    const activeConfig = state.apiConfigs.find((c) => c.id === state.activeConfigId);
    if (!activeConfig) {
      setError('请先配置 API 信息');
      dispatch({ type: AppActionType.TOGGLE_PUSH_DIALOG, payload: false });
      dispatch({ type: AppActionType.TOGGLE_CONFIG_DIALOG, payload: true });
      return;
    }

    dispatch({ type: AppActionType.SET_PUSHING, payload: true });
    setError('');
    setSuccess('');

    try {
      const response = await pushToDraft({
        title: title.trim(),
        content: state.formattedHtml,
        digest: digest.trim(),
        thumbMediaId: thumbMediaId.trim(),
        appId: activeConfig.appId,
        appSecret: activeConfig.appSecret,
      });

      if (response.code === 0) {
        setSuccess(`推送成功！媒体 ID: ${response.mediaId}`);
      } else {
        setError(`推送失败：${response.message}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '未知错误';
      setError(`推送失败：${message}`);
    } finally {
      dispatch({ type: AppActionType.SET_PUSHING, payload: false });
    }
  }, [title, digest, thumbMediaId, state.formattedHtml, state.apiConfigs, state.activeConfigId, dispatch]);

  const handleConfigChange = (e: SelectChangeEvent<string>): void => {
    dispatch({ type: AppActionType.SET_ACTIVE_CONFIG, payload: e.target.value });
  };

  return (
    <Dialog open={state.isPushDialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>推送到公众号草稿箱</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          label="文章标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          size="small"
          sx={{ mt: 1, mb: 2 }}
        />

        <TextField
          label="文章摘要（选填）"
          value={digest}
          onChange={(e) => setDigest(e.target.value)}
          fullWidth
          multiline
          rows={2}
          size="small"
          sx={{ mb: 2 }}
        />

        <TextField
          label="封面图 Media ID（选填）"
          value={thumbMediaId}
          onChange={(e) => setThumbMediaId(e.target.value)}
          fullWidth
          size="small"
          placeholder="通过素材管理上传获取"
          sx={{ mb: 2 }}
        />

        {state.apiConfigs.length > 0 && (
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>选择公众号账号</InputLabel>
            <Select
              value={state.activeConfigId}
              label="选择公众号账号"
              onChange={handleConfigChange}
            >
              {state.apiConfigs.map((config) => (
                <MenuItem key={config.id} value={config.id}>
                  {config.name} ({config.appId})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {state.apiConfigs.length === 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            尚未配置公众号 API，请先在「API 配置」中添加。
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={state.isPushing}>
          取消
        </Button>
        <Button
          onClick={handlePush}
          variant="contained"
          disabled={state.isPushing || state.apiConfigs.length === 0}
          startIcon={state.isPushing ? <CircularProgress size={16} /> : null}
        >
          {state.isPushing ? '推送中...' : '推送'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PushDialog;
