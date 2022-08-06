import { createTheme } from "@mui/material/styles";

import colors from "../assets/scss/_themes-vars.module.scss";

import { componentStyleOverrides } from "./compStyleOverride";
import { themePalette } from "./palette";
import { themeTypography } from "./typography";
import { customShadows } from "./shadows";

const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.25rem",
};

const Radius = 12;

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */
export function theme(customization) {
  let color = colors;

  let themeOption = {
    colors: color,
    fontSize,
    heading: "",
    paper: "",
    backgroundDefault: "",
    background: "",
    textPrimary: "",
    darkTextSecondary: "",
    textDark: "",
    textLight: "",
    menuSelected: "",
    menuSelectedBack: "",
    divider: "",
    customization: customization,
    defaultGradient: `linear-gradient(45deg, #C28B33 14.64%, #FFE67C 85.39%)`,
  };

  switch (customization.navType) {
    case "dark":
      themeOption.paper = color.darkLevel2;
      themeOption.backgroundDefault = color.darkPaper;
      themeOption.background = color.darkBackground;
      themeOption.textPrimary = color.darkTextPrimary;
      themeOption.textSecondary = color.darkTextSecondary;
      themeOption.textTertiary = color.darkTextTertiary;
      themeOption.textDark = color.darkTextPrimary;
      themeOption.textLight = color.lightTextPrimary;
      themeOption.menuBackground = color.darkLevel1;
      themeOption.menuSelected = color.darkSecondaryMain;
      themeOption.menuSelectedBack = color.darkSecondaryMain + 15;
      themeOption.menuSelected = color.paper;
      themeOption.divider = color.darkTextPrimary;
      themeOption.heading = color.darkTextSecondary;
      break;
    case "light":
    default:
      themeOption.paper = color.paper;
      themeOption.backgroundDefault = color.paper;
      // themeOption.background = color.primaryLight;
      themeOption.background = color.primaryLight;
      themeOption.textPrimary = color.lightTextPrimary;
      themeOption.textSecondary = color.lightTextSecondary;
      themeOption.textTertiary = color.lightTextTertiary;
      themeOption.textDark = color.grey900;
      themeOption.menuBackground = color.paper;
      themeOption.menuSelected = color.lightTextPrimary;
      themeOption.menuSelectedBack = color.secondaryLight;
      themeOption.menuSelected = color.paper;
      themeOption.divider = color.grey200;
      themeOption.heading = color.grey900;
      break;
  }

  return createTheme({
    direction: customization.rtlLayout ? "rtl" : "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
      lightGray200Border: {
        border: `1px solid ${color.lightGray200Border}`,
      },
      overflowEllipsis2: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": 2,
      },
    },
    customShadows: customShadows(customization.navType, themeOption),
    typography: themeTypography(themeOption),
    components: componentStyleOverrides(themeOption),
    themeOption,
    colors,
    fontSize,
    customization,
    radius: Radius,
  });
}

export default theme;
