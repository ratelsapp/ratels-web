// import React, { lazy } from "react";
// import { Route, Switch, useLocation } from "react-router-dom";
// import GuestGuard from "../utils/route-guard/GuestGuard";
// import MinimalLayout from "../layout/MinimalLayout";
// import NavMotion from "../layout/NavMotion";
// import Loadable from "../ui-component/Loadable";

// export default function NoAuthRoutes() {
//   const location = useLocation();

//   return (
//     <Route path={["/login", "/createKeypair", "/connectWallet", "/importKeypair", "/nft/info/:tokenId"]}>
//       <MinimalLayout>
//         <Switch location={location} key={location.pathname}>
//           <NavMotion>
//             <GuestGuard></GuestGuard>
//           </NavMotion>
//         </Switch>
//       </MinimalLayout>
//     </Route>
//   );
// }
