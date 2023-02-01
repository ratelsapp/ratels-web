import { Route, Switch, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Index from "../views/index";

export default function Routes() {
  const location = useLocation();

  return (
    <Switch>
      <Route path={["/"]}>
        <MainLayout>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Index} />
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
}
