import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import ChatBotContainer from 'src/container/ChatBotContainer';

const Routes  = [
  <Route key={0} exact={true} path="/" component={ChatBotContainer} />,
];

const MainRoutes = () => (
  <div>
    <Switch>
      {Routes}
    </Switch>
  </div>
);

export default MainRoutes;