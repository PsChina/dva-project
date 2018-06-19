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

// pms routers
const channelTransferManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/channelManage/ChannelTransferManage'));
    loadEnd();
  }, 'terminalCompanyManage');
}
const channelScancodeManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/channelManage/ChannelScancodeManage'));
    loadEnd();
  }, 'channelScancodeManage');
}
const channelTransferApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/channelApply/ChannelTransferApply'));
    loadEnd();
  }, 'channelTransferApply');
}

const channelBankcardManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/channelManage/ChannelBankcardManage'));
    loadEnd();
  }, 'channelBankcardManage');
}

const merchantScancodeManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/merchantManage/MerchantScancodeManage'));
    loadEnd();
  }, 'merchantScancodeManage');
}

const channelBankcardApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/channelApply/ChannelBankcardApply'));
    loadEnd();
  }, 'channelBankcardApply');
}
const channelScancodeApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/channelApply/ChannelScancodeApply'));
    loadEnd();
  }, 'channelScancodeApply');
}

const merchantBankcardManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/merchantManage/MerchantBankcardManage'));
    loadEnd();
  }, 'merchantBankcardManage');
}

const routerMerBankcardManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/routerManage/RouterMerBankcardManage'));
    loadEnd();
  }, 'routerMerBankcardManage');
}

const routerMerScancodeManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/routerManage/RouterMerScancodeManage'));
    loadEnd();
  }, 'routerMerScancodeManage');
}

const routerBankcardModManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/routerManage/RouterBankcardModManage'));
    loadEnd();
  }, 'routerBankcardModManage');
}

const routerScancodeModManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/routerManage/RouterScancodeModManage'));
    loadEnd();
  }, 'routerScancodeModManage');
}

const merSmartRouterManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/routerManage/MerSmartRouterManage'));
    loadEnd();
  }, 'merSmartRouterManage');
}


const merchantBankcardApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/merchantApply/MerchantBankcardApply'));
    loadEnd();
  }, 'merchantBankcardApply');
}
const merChantScancodeApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/merchantApply/MerchantScancodeApply'));
    loadEnd();
  }, 'merChantScancodeApply');
}

const terminalBankcardManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/terminalManage/TerminalBankcardManage'));
    loadEnd();
  }, 'terminalBankcardManage');
}

const merChantTransferApply = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/merchantApply/MerchantTransferApply'));
    loadEnd();
  }, 'merChantTransferApply');
}

const merchantTransferManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/pms/merchantManage/MerchantTransferManage'));
    loadEnd();
  }, 'merchantTransferManage');
}


export function getPmsRoutes(app, onEnter) {
  return [
    { path: '/pms/channelManage/channelTransferManage', getComponent: channelTransferManage, onEnter },
    { path: '/pms/channelApply/channelTransferApply', getComponent: channelTransferApply, onEnter },
    { path: '/pms/channelManage/channelBankcardManage', getComponent: channelBankcardManage, onEnter },
    { path: '/pms/channelApply/channelBankcardApply', getComponent: channelBankcardApply, onEnter },
    { path: '/pms/channelManage/channelScancodeManage', getComponent: channelScancodeManage, onEnter },
    { path: '/pms/merchantManage/merchantScancodeManage', getComponent: merchantScancodeManage, onEnter },
    { path: '/pms/merchantManage/merchantBankcardManage', getComponent: merchantBankcardManage, onEnter },
    { path: '/pms/merchantApply/merChantBankcardApply', getComponent: merchantBankcardApply, onEnter },
    { path: '/pms/routerManage/routerMerBankcardManage', getComponent: routerMerBankcardManage, onEnter },
    { path: '/pms/routerManage/routerMerScancodeManage', getComponent: routerMerScancodeManage, onEnter },
    { path: '/pms/routerManage/routerScancodeModManage', getComponent: routerScancodeModManage, onEnter },
    { path: '/pms/routerManage/routerBankcardModManage', getComponent: routerBankcardModManage, onEnter },
    { path: '/pms/routerManage/merSmartRouterManage', getComponent: merSmartRouterManage, onEnter },
    { path: '/pms/channelApply/channelScancodeApply', getComponent: channelScancodeApply, onEnter },
    { path: '/pms/merchantApply/merChantScancodeApply', getComponent: merChantScancodeApply, onEnter },
    { path: '/pms/terminalManage/terminalBankcardManage', getComponent: terminalBankcardManage, onEnter },
    { path: '/pms/merchantApply/merChantTransferApply', getComponent: merChantTransferApply, onEnter },
    { path: '/pms/merchantManage/merchantTransferManage', getComponent: merchantTransferManage, onEnter },
  ];
}
