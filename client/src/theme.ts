import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#30cf69",
    },
    secondary: {
      main: "#21C65E",
    },
    background: {
      default: "#f0fdf4",
    },
  },
  typography: {
    fontFamily: `".SF NS", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "grey" },
          style: {
            backgroundColor: "#e0e0e0",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#cfcfcf",
            },
          },
        },
      ],
    },
  },
});

export default theme;
