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

// bas routers
const userManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/sysManage/UserManage'));
    loadEnd();
  }, 'userSystemManage');
}
const roleManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/sysManage/RoleManage'));
    loadEnd();
  }, 'roleSystemManage');
}
const menuManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/sysManage/MenuManage'));
    loadEnd();
  }, 'menuSystemManage');
}
const orgManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/sysManage/OrgManage'));
    loadEnd();
  }, 'orgManage');
}
const passwordUpdate = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/sysManage/PasswordUpdate'));
    loadEnd();
  }, 'passwordUpdate');
}
const logManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/logManage/LogManage'));
    loadEnd();
  }, 'logManage');
}
const jobTriggerInfoManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/jobTirgger/JobTriggerInfoManage'));
    loadEnd();
  }, 'jobTriggerInfoManage');
}
const jobTriggerLogManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/jobTirgger/JobTriggerLogManage'));
    loadEnd();
  }, 'jobTriggerLogManage');
}
const dubboServicesManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/dubboManage/DubboServicesManage'));
    loadEnd();
  }, 'dubboServicesManage');
}
const modelMainManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/workflow/ModelMainManage'));
    loadEnd();
  }, 'modelMainManage');
}
const positionManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/workflow/PositionManage'));
    loadEnd();
  }, 'positionManage');
}
const procedureManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/workflow/ProcedureManage'));
    loadEnd();
  }, 'procedureManage');
}
const taskMonitorManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/workflow/TaskMonitorManage'));
    loadEnd();
  }, 'taskMonitorManage');
}
const pubBankManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/PubBankManage'));
    loadEnd();
  }, 'pubBankManage');
}
const pubMccManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/PubMccManage'));
    loadEnd();
  }, 'pubMccManage');
}
const pubCountryManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/PubCountryManage'));
    loadEnd();
  }, 'pubCountryManage');
}
const pubCurrencyManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/PubCurrencyManage'));
    loadEnd();
  }, 'pubCurrencyManage');
}
const pubExchangeRateManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/PubExchangeRateManage'));
    loadEnd();
  }, 'pubExchangeRateManage');
}
const pubUnionfitManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/PubUnionfitManage'));
    loadEnd();
  }, 'pubUnionfitManage');
}
const pubAreaManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/PubAreaManage'));
    loadEnd();
  }, 'pubAreaManage');
}
const holidayManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/basDataManage/HolidayManage'));
    loadEnd();
  }, 'taskMonitorManage');
}
const pubAnnmentManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/messageManage/PubAnnmentManage'));
    loadEnd();
  }, 'pubAnnmentManage');
}
const pubMessageManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/bas/messageManage/PubMessageManage'));
    loadEnd();
  }, 'pubMessageManage');
}

export function getBasRoutes(app, onEnter) {
  return [
    { path: '/bas/sysManage/userManage', getComponent: userManage, onEnter },
    { path: '/bas/sysManage/roleManage', getComponent: roleManage, onEnter },
    { path: '/bas/sysManage/menuManage', getComponent: menuManage, onEnter },
    { path: '/bas/sysManage/orgManage', getComponent: orgManage, onEnter },
    { path: '/bas/sysManage/passwordUpdate', getComponent: passwordUpdate, onEnter },
    { path: '/bas/logManage/logManage', getComponent: logManage, onEnter },
    { path: '/bas/jobTirgger/jobTriggerInfoManage', getComponent: jobTriggerInfoManage, onEnter },
    { path: '/bas/jobTirgger/jobTriggerLogManage', getComponent: jobTriggerLogManage, onEnter },
    { path: '/bas/dubbo/services', getComponent: dubboServicesManage, onEnter },
    { path: '/bas/workflow/modelMainManage', getComponent: modelMainManage, onEnter },
    { path: '/bas/workflow/positionManage', getComponent: positionManage, onEnter },
    { path: '/bas/workflow/procedureManage', getComponent: procedureManage, onEnter },
    { path: '/bas/workflow/taskMonitorManage', getComponent: taskMonitorManage, onEnter },
    { path: '/bas/basDataManage/holidayManage', getComponent: holidayManage, onEnter },
    { path: '/bas/basDataManage/pubBankManage', getComponent: pubBankManage, onEnter },
    { path: '/bas/basDataManage/pubMccManage', getComponent: pubMccManage, onEnter },
    { path: '/bas/basDataManage/pubCountryManage', getComponent: pubCountryManage, onEnter },
    { path: '/bas/basDataManage/pubCurrencyManage', getComponent: pubCurrencyManage, onEnter },
    { path: '/bas/basDataManage/pubExchangeRateManage', getComponent: pubExchangeRateManage, onEnter },
    { path: '/bas/basDataManage/pubUnionfitManage', getComponent: pubUnionfitManage, onEnter },
    { path: '/bas/basDataManage/pubAreaManage', getComponent: pubAreaManage, onEnter },
    { path: '/bas/messageManage/pubAnnmentManage', getComponent: pubAnnmentManage, onEnter },
    { path: '/bas/messageManage/pubMessageManage', getComponent: pubMessageManage, onEnter },
  ];
}
