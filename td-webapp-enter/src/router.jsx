import React from 'react';
import { Router, Route } from 'dva/router';
import Error404 from './components/common/Error404'
import IndexPage from './routes/IndexPage';
import Main from './routes/main/Main';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/main" component={Main} />
      <Route path="*" component={Error404} />
    </Router>
  );
}
