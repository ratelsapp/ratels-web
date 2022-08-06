import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Routes from "./routes";
import theme from "./themes";
import NavigationScroll from "./layout/NavigationScroll";
import Snackbar from "./components/Snackbar";
import usePublicData from "hooks/usePublicData";
import useAuth from "hooks/useAuth";

const App = () => {
  const { load } = useAuth();

  useEffect(() => {
    load([]);
  }, []);

  usePublicData();
  let customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
          <Snackbar />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
