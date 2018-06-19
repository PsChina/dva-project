import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// set nprogress theme color style
const npColor = '#fff';
const bgStyle = `style="background:${npColor}"`;
const spStyle = `style="border-top-color:${npColor};border-left-color:${npColor}"`;
const pegStyle = `style="box-shadow:0 0 10px ${npColor}, 0 0 5px ${npColor}"`;
const temp = `<div class="bar" ${bgStyle} role="bar"><div class="peg" ${pegStyle}></div></div><div class="spinner" role="spinner"><div class="spinner-icon" ${spStyle}></div></div>`;
NProgress.configure({ template: temp });

const loadStart = () => {
  NProgress.inc();
}
const loadEnd = () => {
  NProgress.done();
}

// mms routers
const PersonalMemberManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      callback(null, require('./routes/mms/memberManage/PersonalMemberManage'));
      loadEnd();
    }, 'PersonalMemberManage');
  }
const PersonalMemberApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberApply/PersonalMemberApply'));
    loadEnd();
  }, 'PersonalMemberApply');
}
const AgentManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberManage/AgentManage'));
    loadEnd();
  }, 'AgentManage');
}
const AgentApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberApply/AgentApply'));
    loadEnd();
  }, 'AgentApply');
}
const AgentRoleManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberRoleManage/AgentRoleManage'));
    loadEnd();
  }, 'AgentRoleManage');
}
const AgentUsrManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberUserManage/AgentUsrManage'));
    loadEnd();
  }, 'AgentUsrManage');
}
const MerchantStoreManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberManage/MerchantStoreManage'));
    loadEnd();
  }, 'MerchantStoreManage');
}
const MerchantStoreApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberApply/MerchantStoreApply'));
    loadEnd();
  }, 'MerchantStoreApply');
}
const MerchantStoreUsrManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberUserManage/MerchantStoreUsrManage'));
    loadEnd();
  }, 'MerchantStoreUsrManage');
}
const MerchantStoreRoleManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberRoleManage/MerchantStoreRoleManage'));
    loadEnd();
  }, 'MerchantStoreRoleManage');
}
const MerchantManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberManage/MerchantManage'));
    loadEnd();
  }, 'MerchantManage');
}
const MerchantRoleManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberRoleManage/MerchantRoleManage'));
    loadEnd();
  }, 'MerchantRoleManage');
}
const MerchantUsrManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberUserManage/MerchantUsrManage'));
    loadEnd();
  }, 'MerchantUsrManage');
}
const MerchantApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberApply/MerchantApply'));
    loadEnd();
  }, 'MerchantApply');
}
const MerchantGlobalApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/memberApply/MerchantGlobalApply'));
    loadEnd();
  }, 'MerchantGlobalApply');
}
// demo routers
const ProductManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/demo/product/ProductManage.jsx'));
    loadEnd();
  }, 'ProductManage');
};
const TaskMerchantManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/taskManage/TaskMerchantManage'));
    loadEnd();
  }, 'TaskMerchantManage');
}
const TaskAgentManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/taskManage/TaskAgentManage'));
    loadEnd();
  }, 'TaskAgentManage');
}
const TaskStoreManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/mms/taskManage/TaskStoreManage'));
    loadEnd();
  }, 'TaskStoreManage');
}

export function getMmsRoutes(app, onEnter) {
  return [
    { path: '/mms/memberManage/merchantManage', getComponent: MerchantManage, onEnter },
    { path: '/mms/memberRoleManage/merchantRoleManage', getComponent: MerchantRoleManage, onEnter },
    { path: '/mms/memberRoleManage/merchantStoreRoleManage', getComponent: MerchantStoreRoleManage, onEnter },
    { path: '/mms/memberManage/merchantStoreManage', getComponent: MerchantStoreManage, onEnter },
    { path: '/mms/memberUserManage/MerchantStoreUsrManage', getComponent: MerchantStoreUsrManage, onEnter },
    { path: '/mms/memberApply/merchantStoreApply', getComponent: MerchantStoreApply, onEnter },
    { path: '/mms/memberUserManage/MerchantUsrManage', getComponent: MerchantUsrManage, onEnter },
    { path: '/mms/memberManage/agentManage', getComponent: AgentManage, onEnter },
    { path: '/mms/memberUserManage/agentUsrManage', getComponent: AgentUsrManage, onEnter },
    { path: '/mms/memberApply/agentApply', getComponent: AgentApply, onEnter },
    { path: '/mms/memberApply/MerchantApply', getComponent: MerchantApply, onEnter },
    { path: '/mms/memberApply/MerchantGlobalApply', getComponent: MerchantGlobalApply, onEnter },
    { path: '/mms/memberRoleManage/AgentRoleManage', getComponent: AgentRoleManage, onEnter },
    { path: '/mms/taskManage/taskMerchantManage', getComponent: TaskMerchantManage, onEnter },
    { path: '/mms/taskManage/taskAgentManage', getComponent: TaskAgentManage, onEnter },
    { path: '/mms/taskManage/TaskStoreManage', getComponent: TaskStoreManage, onEnter },
  ];
}
