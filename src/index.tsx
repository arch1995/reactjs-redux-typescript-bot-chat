import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from './store';
import './index.css';
import MainRoutes from './common/Routes';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="fill-in-screen">
        <MainRoutes />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
