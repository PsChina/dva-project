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

// tms routers
const terminalCompanyManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalManage/TerminalCompanyManage'));
    loadEnd();
  }, 'terminalCompanyManage');
}
const terminalModelManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalManage/TerminalModelManage'));
    loadEnd();
  }, 'terminalModelManage');
}
const terminalKeyManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalManage/TerminalKeyManage'));
    loadEnd();
  }, 'terminalKeyManage');
}
const terminalFirmwareManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalManage/TerminalFirmwareManage'));
    loadEnd();
  }, 'terminalFirmwareManage');
}
// const terminalParamManage = (location, callback) => {
//   loadStart();
//   require.ensure([], (require) => {
//     callback(null, require('./routes/tms/terminalManage/TerminalParamManage'));
//     loadEnd();
//   }, 'terminalParamManage');
// }
const terminalParamTemp = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalManage/TerminalParamTemp'));
    loadEnd();
  }, 'terminalParamTemp');
}
const terminalAppManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalManage/TerminalAppManage'));
    loadEnd();
  }, 'terminalAppManage');
}
const terminalLogManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalInfoManage/TerminalLogManage'));
    loadEnd();
  }, 'terminalLogManage');
}
const terminalStockManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalInfoManage/TerminalStockManage'));
    loadEnd();
  }, 'terminalStockManage');
}
const terminalStockAdd = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalInfoManage/TerminalStockAdd'));
    loadEnd();
  }, 'terminalStockAdd');
}
const terminalManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalInfoManage/TerminalManage'));
    loadEnd();
  }, 'terminalManage');
}

const terminalAgentManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalBindManage/TerminalAgentManage'));
    loadEnd();
  }, 'terminalAgentManage');
}
const terminalMerManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalBindManage/TerminalMerManage'));
    loadEnd();
  }, 'terminalMerManage');
}
const qrCodeInfoManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/qrCodeManage/QrCodeInfoManage'));
    loadEnd();
  }, 'qrCodeInfoManage');
}

const terminalTxnAuthManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/tms/terminalManage/TerminalTxnAuthManage'));
    loadEnd();
  }, 'terminalTxnAuthManage');
}

export function getTmsRoutes(app, onEnter) {
  return [
    { path: '/tms/terminalManage/terminalTxnAuthManage', getComponent: terminalTxnAuthManage, onEnter },
    { path: '/tms/terminalManage/terminalCompanyManage', getComponent: terminalCompanyManage, onEnter },
    { path: '/tms/terminalManage/terminalModelManage', getComponent: terminalModelManage, onEnter },
    { path: '/tms/terminalManage/terminalKeyManage', getComponent: terminalKeyManage, onEnter },
    { path: '/tms/terminalManage/terminalFirmwareManage', getComponent: terminalFirmwareManage, onEnter },
    { path: '/tms/terminalManage/terminalParamTemp', getComponent: terminalParamTemp, onEnter },
    { path: '/tms/terminalManage/terminalAppManage', getComponent: terminalAppManage, onEnter },
    { path: '/tms/terminalInfoManage/terminalLogManage', getComponent: terminalLogManage, onEnter },
    { path: '/tms/terminalInfoManage/terminalStockManage', getComponent: terminalStockManage, onEnter },
    { path: '/tms/terminalInfoManage/terminalStockAdd', getComponent: terminalStockAdd, onEnter },
    { path: '/tms/terminalInfoManage/terminalManage', getComponent: terminalManage, onEnter },
    { path: '/tms/terminalBindManage/terminalAgentManage', getComponent: terminalAgentManage, onEnter },
    { path: '/tms/terminalBindManage/terminalMerManage', getComponent: terminalMerManage, onEnter },
    { path: '/tms/qrCodeManage/qrCodeInfoManage', getComponent: qrCodeInfoManage, onEnter },
  ];
}
