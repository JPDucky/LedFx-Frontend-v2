import { createMuiTheme } from '@material-ui/core/styles';


export const BladeDarkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#b00000',
    },
    secondary: {
      main: '#500000',
    },
    background: { 
      default: '#030303', 
      paper: '#151515' 
    },
  },
  props: {
    MuiCard: {
      variant: 'outlined',
    },
  },
});

export const BladeLightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#800000',
    },
    secondary: {
      main: '#800000',
    },
    // background: { default: '#030303', paper: '#151515' },
  },
  props: {
    MuiCard: {
      variant: 'outlined',
    },
  },
});