import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Error401 from './components/common/Error401';
import Error404 from './components/common/Error404';
import IndexPage from './routes/IndexPage';
import Login from './routes/login/Login';
import App from './routes/merp/app/App';
import LoginPwdBack from './routes/login/LoginPwdBack';
import { setToken, setCookie } from './utils/storage';
import Config from '../config/config.json';

// set nprogress theme color style
const npColor = '#1c90f2';
const bgStyle = `style="background:${npColor}"`;
const spStyle = `style="border-top-color:${npColor};border-left-color:${npColor}"`;
const pegStyle = `style="box-shadow:0 0 10px ${npColor}, 0 0 5px ${npColor}"`;
const temp = `<div class="bar" ${bgStyle} role="bar"><div class="peg" ${pegStyle}></div></div><div class="spinner" role="spinner"><div class="spinner-icon" ${spStyle}></div></div>`;
NProgress.configure({ template: temp });

export default function ({ history, app }) {
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

  const loadStart = () => {
    NProgress.inc();
  }

  const loadEnd = () => {
    NProgress.done();
  }

  // 动态加载页面
  const Home = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/Home.jsx'));
      loadEnd();
    }, 'Home');
  };
  const Home1 = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/Home1.jsx'));
      loadEnd();
    }, 'Home1');
  };
  const Home2 = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/Home2.jsx'));
      loadEnd();
    }, 'Home2');
  };
  const Home3 = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/Home3.jsx'));
      loadEnd();
    }, 'Home3');
  };

  // merp Routers
  const merchantstoreApply = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/home/MerchantStoreApply.jsx'));
      loadEnd();
    }, 'MerchantStoreApply');
  };
  const merchantstoreManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/home/MerchantStoreManage.jsx'));
      loadEnd();
    }, 'MerchantStoreManage');
  };
  const merchantstoreUsrManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/home/MerchantStoreUsrManage.jsx'));
      loadEnd();
    }, 'MerchantStoreUsrManage');
  };
  const taskStoreManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/home/TaskStoreManage.jsx'));
      loadEnd();
    }, 'taskStoreManage');
  };

  const merchantTerminalManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/terminalManage/MerchantTerminalManage'));
      loadEnd();
    }, 'merchantTerminalManage');
  }

  const summaryOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/orderManage/SummaryOrderManage'));
      loadEnd();
    }, 'summaryOrderManage');
  }
  const summaryHisOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/orderManage/SummaryHisOrderManage'));
      loadEnd();
    }, 'summaryHisOrderManage');
  }
  const bankcardOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/orderManage/BankcardOrderManage'));
      loadEnd();
    }, 'bankcardOrderManage');
  }
  const bankcardHisOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/orderManage/BankcardHisOrderManage'));
      loadEnd();
    }, 'bankcardHisOrderManage');
  }
  const scanOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/orderManage/ScanOrderManage'));
      loadEnd();
    }, 'scanOrderManage');
  }
  const merStlManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/stlManage/MerStlManage'));
      loadEnd();
    }, 'merStlManage');
  }
  const merStlWithdraw = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/stlManage/MerStlWithdraw'));
      loadEnd();
    }, 'merStlWithdraw');
  }
  const scanHisOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/orderManage/ScanHisOrderManage'));
      loadEnd();
    }, 'scanHisOrderManage');
  }

  const pwdService = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/service/PwdService'));
      loadEnd();
    }, 'pwdService');
  }

  const merInf = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/service/MerInf'));
      loadEnd();
    }, 'pwdService');
  }

  const announcement = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/merp/annManage/AnnouncementManage'));
      loadEnd();
    }, 'announcementManage');
  }

  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="login" />
        <Route path="/login" component={Login} />
        <Route path="/loginPwdBack" component={LoginPwdBack} />
        <Route path="/" component={IndexPage}>
          <IndexRedirect to="home" />
          <Route path="/home" getComponent={Home} />
          <Route path="/home1" getComponent={Home1} />
          <Route path="/home2" getComponent={Home2} />
          <Route path="/home3" getComponent={Home3} />
          <Route path="/merp/store/storeApply" getComponent={merchantstoreApply} />
          <Route path="/merp/store/storeManage" getComponent={merchantstoreManage} />
          <Route path="/merp/store/storeUsrManage" getComponent={merchantstoreUsrManage} />
          <Route path="/merp/store/taskStoreManage" getComponent={taskStoreManage} />
          <Route path="/merp/terminalManage/merchantTerminalManage" getComponent={merchantTerminalManage} onEnter={handleEnter} />
          <Route path="/merp/orderManage/summaryOrderManage" getComponent={summaryOrderManage} onEnter={handleEnter} />
          <Route path="/merp/orderManage/summaryHisOrderManage" getComponent={summaryHisOrderManage} onEnter={handleEnter} />
          <Route path="/merp/orderManage/bankcardOrderManage" getComponent={bankcardOrderManage} onEnter={handleEnter} />
          <Route path="/merp/orderManage/bankcardHisOrderManage" getComponent={bankcardHisOrderManage} onEnter={handleEnter} />
          <Route path="/merp/orderManage/scanOrderManage" getComponent={scanOrderManage} onEnter={handleEnter} />
          <Route path="/merp/stlManage/merStlManage" getComponent={merStlManage} onEnter={handleEnter} />
          <Route path="/merp/stlManage/merStlWithdraw" getComponent={merStlWithdraw} onEnter={handleEnter} />
          <Route path="/merp/orderManage/scanHisOrderManage" getComponent={scanHisOrderManage} onEnter={handleEnter} />
          <Route path="/merp/service/pwdService" getComponent={pwdService} onEnter={handleEnter} />
          <Route path="/merp/service/merInf" getComponent={merInf} onEnter={handleEnter} />
          <Route path="/merp/announcement/announcementManage" getComponent={announcement} onEnter={handleEnter} />
          <Route path="/error/401" component={Error401} />
          <Route path="*" component={Error404} />
        </Route>
      </Route>
    </Router >
  );
}
