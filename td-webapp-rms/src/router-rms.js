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

// rms routers
const bankCardBlackList = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/blackListManage/BankCardBlackListManage'));
    loadEnd();
  }, 'bankCardBlackListManage');
}
const merBlackList = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/blackListManage/MerBlackListManage'));
    loadEnd();
  }, 'merBlackListManage');
}
const storeBlackList = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/blackListManage/StoreBlackListManage'));
    loadEnd();
  }, 'storeBlackListManage');
}
const termBlackList = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/blackListManage/TermBlackListManage'));
    loadEnd();
  }, 'termBlackListManage');
}
const blackListLog = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/blackListManage/BlackListLogManage'));
    loadEnd();
  }, 'blackListLogManage');
}
const mccLimitManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/limitManage/MccLimitManage'));
    loadEnd();
  }, 'mccLimitManage');
}
const merLimitManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/limitManage/MerLimitManage'));
    loadEnd();
  }, 'merLimitManage');
}
const qrLimitManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/limitManage/QrLimitManage'));
    loadEnd();
  }, 'qrLimitManage');
}
const storeLimitManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/limitManage/StoreLimitManage'));
    loadEnd();
  }, 'storeLimitManage');
}
const termLimitManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/limitManage/TermLimitManage'));
    loadEnd();
  }, 'termLimitManage');
}
const ruleManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/ruleManage/RuleManage'));
    loadEnd();
  }, 'ruleManage');
}
const warnGroup = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/warnGroup/WarnGroupManage'));
    loadEnd();
  }, 'warnGroup');
}
const paperBlackList = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/blackListManage/PaperBlackListManage'));
    loadEnd();
  }, 'paperBlackListManage');
}
const warnUserManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/warmUser/WarnUserManage'));
    loadEnd();
  }, 'warnUserManage');
}
const ruleMessageManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/rms/ruleMessageManage/RuleMessageManage'));
    loadEnd();
  }, 'warnUserManage');
}

export function getRmsRoutes(app, onEnter) {
  return [
    { path: '/rms/ruleManage', getComponent: ruleManage, onEnter },
    { path: '/rms/ruleMessageManage', getComponent: ruleMessageManage, onEnter },
    { path: '/warnGroup/manage', getComponent: warnGroup, onEnter },
    { path: '/rms/blackListManage/bankCardBlackListManage', getComponent: bankCardBlackList, onEnter },
    { path: '/rms/blackListManage/merBlackListManage', getComponent: merBlackList, onEnter },
    { path: '/rms/blackListManage/storeBlackListManage', getComponent: storeBlackList, onEnter },
    { path: '/rms/blackListManage/termBlackListManage', getComponent: termBlackList, onEnter },
    { path: '/rms/blackListManage/blackListLogManage', getComponent: blackListLog, onEnter },
    { path: '/rms/blackListManage/paperBlackListManage', getComponent: paperBlackList, onEnter },
    { path: '/rms/limitManage/mccLimitManage', getComponent: mccLimitManage, onEnter },
    { path: '/rms/limitManage/merLimitManage', getComponent: merLimitManage, onEnter },
    { path: '/rms/limitManage/storeLimitManage', getComponent: storeLimitManage, onEnter },
    { path: '/rms/limitManage/termLimitManage', getComponent: termLimitManage, onEnter },
    { path: '/rms/limitManage/qrLimitManage', getComponent: qrLimitManage, onEnter },
    { path: '/rms/warmUser/warnUserManage', getComponent: warnUserManage, onEnter },
  ];
}
