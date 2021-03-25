import { createTheme, lightThemePrimitives } from "baseui";

const colors = {
  primary: "black",
  secondary: "gray",
  tertiary: "lightgray",
  white: "white",
};

export const theme = createTheme(
  {
    ...lightThemePrimitives,
    primaryFontFamily: "'Lato', sans-serif",
    primary: colors.primary,
    primary700: "#ea2529",
  },
  {
    name: "custom-typography",
    typography: {
      primaryFontFamily: "'Lato', sans-serif",
      font11: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "11px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold11: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font12: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold12: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font13: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "13px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold13: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font14: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold14: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font16: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold16: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font18: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold18: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "18px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font21: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "21px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold21: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "21px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font24: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "24px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold24: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font30: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "30px",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      fontBold30: {
        fontFamily: "'Lato', sans-serif",
        fontSize: "30px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      font350: {
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "24px",
      },
      font450: {
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "22px",
      },
    },
    sizing: {
      scale25: "25px",
    },
    borders: {
      borderE6: {
        borderColor: "#E6E6E6",
        borderStyle: "solid",
        borderWidth: "1px",
      },
      borderEA: {
        borderColor: "#eaeaea",
        borderStyle: "solid",
        borderWidth: "1px",
      },
    },
    breakpoints: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
    },
    colors,
    buttonBorderRadius: "3px",
  }
);
