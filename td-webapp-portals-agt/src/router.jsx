import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Error401 from './components/common/Error401';
import Error404 from './components/common/Error404';
import IndexPage from './routes/IndexPage';
import Login from './routes/login/Login';
import App from './routes/agtp/app/App';
import LoginPwdBack from './routes/login/LoginPwdBack';

// set nprogress theme color style
const npColor = '#49a9ee';
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
  // agtp routers
  const AgentRoleManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/authManage/AgentRoleManage'));
      loadEnd();
    }, 'AgentRoleManage');
  }
  const AgentUsrManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/authManage/AgentUsrManage'));
      loadEnd();
    }, 'AgentUsrManage');
  }
  const MerchantApply = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/merchantManage/MerchantApply'));
      loadEnd();
    }, 'MerchantApply');
  }
  const MerchantManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/merchantManage/MerchantManage'));
      loadEnd();
    }, 'MerchantManage');
  }
  const MerchantStoreApply = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/merchantManage/MerchantStoreApply'));
      loadEnd();
    }, 'MerchantStoreApply');
  }
  const MerchantStoreManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/merchantManage/MerchantStoreManage'));
      loadEnd();
    }, 'MerchantStoreManage');
  }
  const AgentApply = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/agentManage/AgentApply'));
      loadEnd();
    }, 'AgentApply');
  }
  const AgentManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/agentManage/AgentManage'));
      loadEnd();
    }, 'AgentManage');
  }
  const TerminalManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/terminalManage/TerminalManage'));
      loadEnd();
    }, 'TerminalManage');
  }
  const BankcardOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/tranManage/BankcardOrderManage'));
      loadEnd();
    }, 'BankcardOrderManage');
  }
  const ScanOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/tranManage/ScanOrderManage'));
      loadEnd();
    }, 'ScanOrderManage');
  }
  const StlShrManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/tranManage/StlShrManage'));
      loadEnd();
    }, 'StlShrManage');
  }
  const TaskAgentManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/workManage/TaskAgentManage'));
      loadEnd();
    }, 'TaskAgentManage');
  }
  const TaskMerchantManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/workManage/TaskMerchantManage'));
      loadEnd();
    }, 'TaskMerchantManage');
  }
  const TaskStoreManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/workManage/TaskStoreManage'));
      loadEnd();
    }, 'TaskStoreManage');
  }
  const TerminalAgentManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/terminalManage/TerminalAgentManage'));
      loadEnd();
    }, 'TerminalAgentManage');
  }
  const TerminalMerManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/terminalManage/TerminalMerManage'));
      loadEnd();
    }, 'TerminalMerManage');
  }

  const BankcardHisOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/tranManage/BankcardHisOrderManage'));
      loadEnd();
    }, 'BankcardHisOrderManage');
  }

  const ScanHisOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/tranManage/ScanHisOrderManage'));
      loadEnd();
    }, 'ScanHisOrderManage');
  }

  const SummaryOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/tranManage/SummaryOrderManage'));
      loadEnd();
    }, 'SummaryOrderManage');
  }

  const SummaryHisOrderManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/tranManage/SummaryHisOrderManage'));
      loadEnd();
    }, 'SummaryHisOrderManage');
  }

  const announcement = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/agtp/annManage/AnnouncementManage'));
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
          <Route path="/agtp/authManage/AgentRoleManage" getComponent={AgentRoleManage} onEnter={handleEnter} />
          <Route path="/agtp/authManage/AgentUsrManage" getComponent={AgentUsrManage} onEnter={handleEnter} />
          <Route path="/agtp/merchantManage/MerchantApply" getComponent={MerchantApply} onEnter={handleEnter} />
          <Route path="/agtp/merchantManage/MerchantManage" getComponent={MerchantManage} onEnter={handleEnter} />
          <Route path="/agtp/merchantManage/MerchantStoreApply" getComponent={MerchantStoreApply} onEnter={handleEnter} />
          <Route path="/agtp/merchantManage/MerchantStoreManage" getComponent={MerchantStoreManage} onEnter={handleEnter} />
          <Route path="/agtp/agentManage/AgentApply" getComponent={AgentApply} onEnter={handleEnter} />
          <Route path="/agtp/agentManage/AgentManage" getComponent={AgentManage} onEnter={handleEnter} />
          <Route path="/agtp/terminalManage/TerminalManage" getComponent={TerminalManage} onEnter={handleEnter} />
          <Route path="/agtp/tranManage/BankcardOrderManage" getComponent={BankcardOrderManage} onEnter={handleEnter} />
          <Route path="/agtp/tranManage/ScanOrderManage" getComponent={ScanOrderManage} onEnter={handleEnter} />
          <Route path="/agtp/tranManage/StlShrManage" getComponent={StlShrManage} onEnter={handleEnter} />
          <Route path="/agtp/tranManage/SummaryOrderManage" getComponent={SummaryOrderManage} onEnter={handleEnter} />
          <Route path="/agtp/tranManage/SummaryHisOrderManage" getComponent={SummaryHisOrderManage} onEnter={handleEnter} />
          <Route path="/agtp/workManage/TaskAgentManage" getComponent={TaskAgentManage} onEnter={handleEnter} />
          <Route path="/agtp/workManage/TaskMerchantManage" getComponent={TaskMerchantManage} onEnter={handleEnter} />
          <Route path="/agtp/workManage/TaskStoreManage" getComponent={TaskStoreManage} onEnter={handleEnter} />
          <Route path="/agtp/terminalManage/TerminalAgentManage" getComponent={TerminalAgentManage} onEnter={handleEnter} />
          <Route path="/agtp/terminalManage/TerminalMerManage" getComponent={TerminalMerManage} onEnter={handleEnter} />
          <Route path="/agtp/tranManage/BankcardHisOrderManage" getComponent={BankcardHisOrderManage} onEnter={handleEnter} />
          <Route path="/agtp/tranManage/ScanHisOrderManage" getComponent={ScanHisOrderManage} onEnter={handleEnter} />
          <Route path="/agtp/announcement/announcementManage" getComponent={announcement} onEnter={handleEnter} />
          <Route path="/error/401" component={Error401} />
          <Route path="*" component={Error404} />
        </Route>
      </Route>
    </Router >
  );
}
