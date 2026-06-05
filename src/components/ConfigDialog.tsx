import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '../store/AppContext';
import { AppActionType } from '../store/actions';
import { ConfigManager } from '../services/config-manager';
import { testConnection } from '../services/api';
import type { WxApiConfig, WxApiConfigFormData } from '../types/api-config';

/**
 * ConfigDialog - Dialog for managing WeChat API configurations.
 */
const ConfigDialog: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const configManagerRef = useRef(new ConfigManager());
  const configManager = configManagerRef.current;
  const [formData, setFormData] = useState<WxApiConfigFormData>({
    name: '',
    appId: '',
    appSecret: '',
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | ''>('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Load configs on open
  useEffect(() => {
    if (state.isConfigDialogOpen) {
      configManager.loadConfigsAsync().then((configs) => {
        dispatch({ type: AppActionType.SET_API_CONFIGS, payload: configs });
      });
      setTestResult('');
      setError('');
      setFormData({ name: '', appId: '', appSecret: '' });
    }
  }, [state.isConfigDialogOpen, configManager, dispatch]);

  const handleClose = useCallback((): void => {
    dispatch({ type: AppActionType.TOGGLE_CONFIG_DIALOG, payload: false });
    setTestResult('');
    setError('');
    setFormData({ name: '', appId: '', appSecret: '' });
  }, [dispatch]);

  const handleSave = useCallback(async () => {
    if (!formData.name.trim()) {
      setError('请输入配置名称');
      return;
    }
    if (!formData.appId.trim()) {
      setError('请输入 AppID');
      return;
    }
    if (!formData.appSecret.trim()) {
      setError('请输入 AppSecret');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await configManager.addConfig({
        name: formData.name.trim(),
        appId: formData.appId.trim(),
        appSecret: formData.appSecret.trim(),
      });

      const configs = await configManager.loadConfigsAsync();
      dispatch({ type: AppActionType.SET_API_CONFIGS, payload: configs });

      // Set as active if it's the first config
      if (configs.length === 1) {
        dispatch({ type: AppActionType.SET_ACTIVE_CONFIG, payload: configs[0].id });
      }

      setFormData({ name: '', appId: '', appSecret: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : '保存失败';
      setError(message);
    } finally {
      setSaving(false);
    }
  }, [formData, configManager, dispatch]);

  const handleDelete = useCallback(
    async (id: string) => {
      await configManager.removeConfig(id);
      const configs = await configManager.loadConfigsAsync();
      dispatch({ type: AppActionType.SET_API_CONFIGS, payload: configs });

      // Update active config if needed
      if (state.activeConfigId === id) {
        const newActive = configs.length > 0 ? configs[0].id : '';
        dispatch({ type: AppActionType.SET_ACTIVE_CONFIG, payload: newActive });
      }
    },
    [configManager, dispatch, state.activeConfigId],
  );

  const handleTestConnection = useCallback(async () => {
    const appId = formData.appId.trim();
    const appSecret = formData.appSecret.trim();

    if (!appId || !appSecret) {
      setError('请先填写 AppID 和 AppSecret');
      return;
    }

    setTesting(true);
    setTestResult('');
    setError('');

    try {
      const isValid = await testConnection(appId, appSecret);
      setTestResult(isValid ? 'success' : 'error');
    } catch {
      setTestResult('error');
    } finally {
      setTesting(false);
    }
  }, [formData.appId, formData.appSecret]);

  const handleSetActive = useCallback(
    (id: string): void => {
      configManager.setActiveConfig(id);
      dispatch({ type: AppActionType.SET_ACTIVE_CONFIG, payload: id });
    },
    [configManager, dispatch],
  );

  return (
    <Dialog open={state.isConfigDialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>API 配置管理</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Existing configs */}
        {state.apiConfigs.length > 0 && (
          <List sx={{ mb: 2 }}>
            {state.apiConfigs.map((config: WxApiConfig) => (
              <ListItem
                key={config.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 1,
                  cursor: 'pointer',
                  backgroundColor:
                    config.id === state.activeConfigId ? '#e3f2fd' : 'transparent',
                }}
                onClick={() => handleSetActive(config.id)}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {config.name}
                      </Typography>
                      {config.id === state.activeConfigId && (
                        <CheckCircleIcon sx={{ fontSize: 16, color: '#1976d2' }} />
                      )}
                    </Box>
                  }
                  secondary={`AppID: ${config.appId}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" size="small" onClick={() => handleDelete(config.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {/* Add new config form */}
        <Typography variant="subtitle2" sx={{ mb: 1, color: '#666' }}>
          添加新配置
        </Typography>

        <TextField
          label="配置名称"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          fullWidth
          size="small"
          placeholder="如：我的公众号"
          sx={{ mb: 2 }}
        />

        <TextField
          label="AppID"
          value={formData.appId}
          onChange={(e) => setFormData((prev) => ({ ...prev, appId: e.target.value }))}
          fullWidth
          size="small"
          placeholder="wx1234567890abcdef"
          sx={{ mb: 2 }}
        />

        <TextField
          label="AppSecret"
          value={formData.appSecret}
          onChange={(e) => setFormData((prev) => ({ ...prev, appSecret: e.target.value }))}
          fullWidth
          size="small"
          type="password"
          placeholder="请输入 AppSecret"
          sx={{ mb: 2 }}
        />

        {testResult === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            连接成功！API 配置有效。
          </Alert>
        )}
        {testResult === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            连接失败，请检查 AppID 和 AppSecret 是否正确。
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleTestConnection}
            disabled={testing}
            startIcon={testing ? <CircularProgress size={14} /> : null}
          >
            {testing ? '测试中...' : '测试连接'}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>关闭</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving}
          startIcon={saving ? <CircularProgress size={14} /> : <AddIcon />}
        >
          {saving ? '保存中...' : '添加配置'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigDialog;
