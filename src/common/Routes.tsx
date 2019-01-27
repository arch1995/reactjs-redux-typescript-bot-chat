import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import ChatBotContainer from 'src/container/ChatBotContainer';

const Routes  = [
  <Route key={0} exact={true} path="/" component={ChatBotContainer} />,
];

const MainRoutes = () => (
  <Switch>
    {Routes}
  </Switch>
);

export default MainRoutes;