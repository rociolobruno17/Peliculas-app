// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // modo oscuro base
    background: {
      default: '#000000', // fondo general negro
      paper: '#121212',   // para cards, dialogs, etc.
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    primary: {
      main: '#f50057', // podés ajustar estos colores
    },
    secondary: {
      main: '#00bcd4',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
});

export default theme;
