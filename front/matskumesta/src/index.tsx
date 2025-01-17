import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';
import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);


