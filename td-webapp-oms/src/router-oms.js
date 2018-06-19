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

// oms routers
const summaryOrderManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/oms/orderManage/SummaryOrderManage'));
    loadEnd();
  }, 'summaryOrderManage');
}
const summaryHisOrderManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/oms/orderManage/SummaryHisOrderManage'));
    loadEnd();
  }, 'summaryHisOrderManage');
}
const bankcardOrderManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/oms/orderManage/BankcardOrderManage'));
    loadEnd();
  }, 'bankcardOrderManage');
}
const bankcardHisOrderManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/oms/orderManage/BankcardHisOrderManage'));
    loadEnd();
  }, 'bankcardHisOrderManage');
}
const scanOrderManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/oms/orderManage/ScanOrderManage'));
    loadEnd();
  }, 'scanOrderManage');
}
const scanHisOrderManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/oms/orderManage/ScanHisOrderManage'));
    loadEnd();
  }, 'scanHisOrderManage');
}
const orderTransRecmanage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/oms/orderManage/OrderTransRecmanage'));
    loadEnd();
  }, 'orderTransRecmanage');
}

export function getOmsRoutes(app, onEnter) {
  return [
    { path: '/oms/orderManage/summaryOrderManage', getComponent: summaryOrderManage, onEnter },
    { path: '/oms/orderManage/summaryHisOrderManage', getComponent: summaryHisOrderManage, onEnter },
    { path: '/oms/orderManage/bankcardOrderManage', getComponent: bankcardOrderManage, onEnter },
    { path: '/oms/orderManage/bankcardHisOrderManage', getComponent: bankcardHisOrderManage, onEnter },
    { path: '/oms/orderManage/scanOrderManage', getComponent: scanOrderManage, onEnter },
    { path: '/oms/orderManage/scanHisOrderManage', getComponent: scanHisOrderManage, onEnter },
    { path: '/oms/orderManage/orderTransRecmanage', getComponent: orderTransRecmanage, onEnter },

  ];
}
