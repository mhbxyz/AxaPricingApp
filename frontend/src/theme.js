import { createTheme } from "@mui/material/styles";

const AXA_BLUE = "#00008F";
const AXA_RED = "#E2001A";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: AXA_BLUE,
    },
    secondary: {
      main: AXA_RED,
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: AXA_BLUE,
    },
  },
  typography: {
    fontFamily: `'Source Sans Pro', Helvetica, Arial, sans-serif`,
    fontWeightRegular: 600,
    fontWeightMedium: 700,
    fontWeightBold: 800,

    h1: {
      fontSize: "2.5rem",
      fontWeight: 800,
      color: AXA_BLUE,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 800,
      color: AXA_BLUE,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: AXA_BLUE,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: AXA_BLUE,
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
