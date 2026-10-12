import { createTheme } from "@mui/material/styles";

/**
 * MUI is used for behaviour and accessibility only (focus, ripple, ARIA).
 * Visual styling is done with Tailwind, so the theme only sets the essentials
 * that MUI needs to render correctly: direction, font and base palette.
 */
export const muiTheme = createTheme({
  direction: "rtl",
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-sans)",
    button: { textTransform: "none", fontWeight: 600 },
  },
  palette: {
    mode: "light",
    primary: { main: "#1c2028", contrastText: "#f6f7f8" },
    secondary: { main: "#e8ad0c", contrastText: "#1c2028" },
  },
  shape: { borderRadius: 999 },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: false } },
    MuiButton: { defaultProps: { disableElevation: true } },
  },
});
