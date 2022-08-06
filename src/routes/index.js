import { Switch } from "react-router-dom";
import AuthRoutes from "./Auth";

const Routes = () => {
  return (
    <Switch>
      <AuthRoutes />
    </Switch>
  );
};

export default Routes;
