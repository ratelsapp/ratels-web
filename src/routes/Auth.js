import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import MainLayout from "./../layout/MainLayout";
import Loadable from "../components/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";

const Index = Loadable(lazy(() => import("../views")));

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route exact path="/" component={Index} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
