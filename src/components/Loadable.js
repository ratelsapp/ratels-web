import React, { Suspense } from "react";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
