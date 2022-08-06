/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
export function themePalette(theme) {
  return {
    mode: theme.customization.navType,
    common: {
      black: theme.colors.darkPaper,
    },
    primary: {
      accountCardBg:
        theme.customization.navType === "dark" ? theme.colors.accountCardBgDarkPrimaryLight : theme.colors.primaryLight,
      light: theme.customization.navType === "dark" ? theme.colors.darkPrimaryLight : theme.colors.primaryLight,
      main: theme.customization.navType === "dark" ? theme.colors.darkPrimaryMain : theme.colors.lightPrimaryMain,
      dark: theme.customization.navType === "dark" ? theme.colors.darkPrimaryDark : theme.colors.primaryDark,
      200: theme.customization.navType === "dark" ? theme.colors.darkPrimary200 : theme.colors.primary200,
      800: theme.customization.navType === "dark" ? theme.colors.darkPrimary800 : theme.colors.primary800,
      400: theme.customization.navType === "dark" ? theme.colors.darkPrimary400 : theme.colors.primary800,
    },
    secondary: {
      light: theme.customization.navType === "dark" ? theme.colors.darkSecondaryLight : theme.colors.secondaryLight,
      main: theme.customization.navType === "dark" ? theme.colors.darkSecondaryMain : theme.colors.secondaryMain,
      dark: theme.customization.navType === "dark" ? theme.colors.darkSecondaryLight : theme.colors.secondaryDark,
      200: theme.customization.navType === "dark" ? theme.colors.darkSecondary200 : theme.colors.secondary200,
      800: theme.customization.navType === "dark" ? theme.colors.darkSecondary800 : theme.colors.secondary800,
    },
    error: {
      light: theme.colors.errorLight,
      main: theme.colors.errorMain,
      dark: theme.colors.errorDark,
    },
    orange: {
      light: theme.colors.orangeLight,
      main: theme.colors.orangeMain,
      dark: theme.colors.orangeDark,
    },
    warning: {
      light: theme.colors.warningLight,
      main: theme.colors.warningMain,
      dark: theme.colors.warningDark,
    },
    success: {
      light: theme.colors.successLight,
      200: theme.colors.success200,
      main: theme.colors.successMain,
      dark: theme.colors.successDark,
    },
    grey: {
      50: theme.colors.grey50,
      100: theme.colors.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.colors.darkTextPrimary,
      900: theme.textDark,
    },
    dark: {
      light: theme.colors.darkTextPrimary,
      main: theme.colors.darkLevel1,
      dark: theme.colors.darkLevel2,
      level3: theme.colors.darkLevel3,
      level4: theme.colors.darkLevel4,
      800: theme.colors.darkBackground,
      900: theme.colors.darkPaper,
      adStyle1: "#2B3049",
      adStyle2: "#FFF",
    },
    text: {
      primary: theme.textPrimary,
      secondary: theme.textSecondary,
      tertiary: theme.textTertiary,
      dark: theme.textDark,
      light: theme.textLight,
      hint: theme.colors.grey100,
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
      level1: theme.customization.navType === "dark" ? theme.colors.darkLevel1 : theme.colors.primaryLight,
      level2: theme.customization.navType === "dark" ? theme.colors.darkLevel2 : theme.colors.lightLevel2,
      level3: theme.customization.navType === "dark" ? theme.colors.darkLevel3 : theme.colors.paper,
      level4: theme.customization.navType === "dark" ? theme.colors.darkLevel4 : theme.colors.lightLevel4,
    },
    border: {
      normal:
        theme.customization.navType === "dark"
          ? "1px solid #313A5A"
          : `1px solid ${theme.colors.lightGray200BorderColor}`,
      gray200:
        theme.customization.navType === "dark"
          ? "1px solid #29314F"
          : `1px solid ${theme.colors.lightGray200BorderColor}`,
    },
    avatar: {
      gray200BgColor: theme.customization.navType === "dark" ? { bgcolor: "#384368" } : { bgcolor: "transparent" },
    },
    loading: {
      background: theme.customization.navType === "dark" ? theme.colors.darkLevel3 : theme.colors.paper,
    },
  };
}
