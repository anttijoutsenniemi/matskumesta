import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#041B15', // Your primary color
    },
    secondary: {
      main: '#136F63', // Your secondary color
    },
    tertiary: {
      main: '#4ce0d2', // All colors after primary and secondary need to be named also to them.d.ts in src
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
    h1: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeight: 700, // Example for customizing header fonts
    },
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeight: 400,
    },
  }

});

export default theme;
