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

// bms routers
// const BusinessOverview = (location, callback) => {
//   loadStart();
//   require.ensure([], (require) => {
//     callback(null, require('./routes/bms/businessManage/BusinessOverview.jsx'));
//     loadEnd();
//   }, 'BusinessOverview');
// };
// const MerchantBusinessManage = (location, callback) => {
//   loadStart();
//   require.ensure([], (require) => {
//     callback(null, require('./routes/bms/businessManage/MerchantBusinessManage.jsx'));
//     loadEnd();
//   }, 'MerchantBusinessManage');
// };
// const AgentBusinessManage = (location, callback) => {
//   loadStart();
//   require.ensure([], (require) => {
//     callback(null, require('./routes/bms/businessManage/AgentBusinessManage.jsx'));
//     loadEnd();
//   }, 'AgentBusinessManage');
// };

export function getBmsRoutes(app, onEnter) {

  const cached = {};
  const registerModel = (app, model) => {
    if (!cached[model.namespace]) {
      app.model(model);
      cached[model.namespace] = 1;
    }
  }
  const BusinessOverview = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      registerModel(app, require('./models/bms/businessOverview'));
      callback(null, require('./routes/bms/businessManage/BusinessOverview.jsx'));
      loadEnd();
    });
  };

  const MerchantBusinessManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      registerModel(app, require('./models/bms/merchantBusinessManage'));
      callback(null, require('./routes/bms/businessManage/MerchantBusinessManage.jsx'));
      loadEnd();
    });
  };

  const AgentBusinessManage = (location, callback) => {
    loadStart();
    require.ensure([], (require) => {
      registerModel(app, require('./models/bms/agentBusinessManage'));
      callback(null, require('./routes/bms/businessManage/AgentBusinessManage.jsx'));
      loadEnd();
    });
  };

  return [
    { path: '/bms/businessManage/businessOverview', getComponent: BusinessOverview, onEnter },
    { path: '/bms/businessManage/merchantBusinessManage', getComponent: MerchantBusinessManage, onEnter },
    { path: '/bms/businessManage/agentBusinessManage', getComponent: AgentBusinessManage, onEnter },
  ];
}
