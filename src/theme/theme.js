import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#060613',
      paper: '#0D0D1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    primary: {
      main: '#02FFA1',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00bcd4',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
  transitions: {
    duration: {
      standard: 300,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'header' },  // nuevo variant "header"
          style: {
            position: "relative",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "transparent",
            color: "#FFFFFF",  // color texto blanco
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#02FFA1",
              backgroundColor: "transparent",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: 0,
              height: "1px",
              left: 0,
              bottom: 4,
              backgroundColor: "#02FFA1",
              transition: "width 0.3s ease",
            },
            "&:hover::after": {
              width: "100%",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

export default theme;