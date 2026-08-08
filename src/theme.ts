'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5B6BFF',
    },
    secondary: {
      main: '#3DD7E5',
    },
    success: {
      main: '#10b981',
    },
    background: {
      default: '#0A0B0F',
      paper: '#14151C',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
