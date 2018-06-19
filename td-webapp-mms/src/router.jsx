import React from 'react';
import { Router } from 'dva/router';
import 'nprogress/nprogress.css';
import Error401 from './components/common/Error401';
import Error404 from './components/common/Error404';
import IndexPage from './routes/IndexPage';
import Home from './routes/Home';
// bms routers
import { getMmsRoutes } from './router-mms';

// 校验url地址权限 path首字母去掉'/'(如果有)
const checkAuth = (items, path) => {
  let pass = false;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.children && item.children.length > 0) {
      pass = checkAuth(item.children, path.charAt(0) === '/' ? path.substr(1) : path);
      if (pass === true) { break; }
    } else if (item.to === path) {
      pass = true; break;
    }
  }
  return pass;
}

export default function ({ history, app }) {
  const handleEnter = (nextState, replace, next) => {
    const path = nextState.location.pathname;                // 当前地址
    const auth = app._store.getState().indexPage.menuItems;  // 所有菜单
    const pass = checkAuth(auth, path.charAt(0) === '/' ? path.substr(1) : path);  // 权限校验结果
    if (pass === false) {
      replace('/error/401'); next();
    } else {
      next();
    }
  }
  // home routes
  const homeRoutes = [
    { path: 'home', component: Home },
  ];
  // bms business routes
  const bmsRoutes = getMmsRoutes(app, handleEnter);
  // other routes
  const otherRoutes = [
    { path: 'error/401', component: Error401 },
    { path: '*', component: Error404 },
  ];
  const childRoutes = [].concat(homeRoutes, bmsRoutes, otherRoutes);
  const routes = {
    path: '/',
    component: IndexPage,
    indexRoute: { component: Home },
    childRoutes,
  }
  return (
    <Router routes={routes} history={history} />
  );
}
