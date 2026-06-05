import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AppProvider } from './store/AppContext';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#0d47a1',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#e65100',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"PingFang SC"',
      '"Hiragino Sans GB"',
      '"Microsoft YaHei"',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 8,
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Layout />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
