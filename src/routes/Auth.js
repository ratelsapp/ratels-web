import { Route, Switch, useLocation } from "react-router-dom";
import MainLayout from "./../layout/MainLayout";

import Index from "../views/index";

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Index} />
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
