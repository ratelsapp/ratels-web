import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import config from "./config";
import store, { persistor } from "./store";
import "./styles/index.scss";
import "./assets/scss/style.scss";
import "./assets/scss/global.scss";
import { PersistGate } from "redux-persist/lib/integration/react";

window.onerror = (msg, url, row, col, error) => {
  error = error.toString();
  console.log(msg, url, row, col, error, "msg, row, col, error");
  // update users not reload error debug
  if (
    /Loading chunk *.{1,} failed./.test(error) ||
    /Unexpected token \'<\'/.test(error)
  ) {
    window.location.reload();
  }
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
