'use client';
import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#5B6BFF' : '#4F46E5',
      },
      secondary: {
        main: '#06B6D4',
      },
      success: {
        main: mode === 'dark' ? '#2BE08C' : '#10B981',
      },
      warning: {
        main: mode === 'dark' ? '#F5D547' : '#F59E0B',
      },
      background: {
        default: mode === 'dark' ? '#0A0B0F' : '#F8FAFC',
        paper: mode === 'dark' ? '#14151C' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#F2F4F8' : '#0F172A',
        secondary: mode === 'dark' ? '#9AA0AE' : '#475569',
      },
    },
    typography: {
      fontFamily: 'inherit',
      allVariants: {
        color: 'inherit',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: mode === 'dark' ? '#F2F4F8' : '#0F172A',
            backgroundColor: mode === 'dark' ? '#0A0B0F' : '#F8FAFC',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'inherit',
          },
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

const theme = getAppTheme('light');
export default theme;

