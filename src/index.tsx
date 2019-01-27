import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import store from './store';
import './index.css';
import MainRoutes from './common/Routes';
import HeaderComponent from './common/Header';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="fill-in-screen">
        <Route key='/' component={HeaderComponent} />
        <MainRoutes />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
