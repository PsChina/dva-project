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

// sms routers
const chnChkSum = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/chkManage/ChnChkSum'));
    loadEnd();
  }, 'chnChkSum');
}

const chnChkDoubtManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/chkManage/ChnChkDoubtManage'));
    loadEnd();
  }, 'chnChkDoubtManage');
}

//渠道错账管理
const chnChkErrorManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/chkManage/ChnChkErrorManage'));
    loadEnd();
  }, 'chnChkErrorManage');
}

//错账处理审核
const chnChkErrorAudit = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/chkManage/ChnChkErrorAudit'));
    loadEnd();
  }, 'chnChkErrorAudit');
}

//清分汇总
const clearingSumManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/clrManage/ClearingSumManage'));
    loadEnd();
  }, 'clearingSumManage');
}

//清分业务
const clearingBusinessManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/clrManage/ClearingBusinessManage'));
    loadEnd();
  }, 'clearingBusinessManage');
}

//划款记录
const stlOrderManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/stlManage/StlOrderManage'));
    loadEnd();
  }, 'stlOrderManage');
}

//结算管理
const stlManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/stlManage/StlManage'));
    loadEnd();
  }, 'stlManage');
}

//结算审核
const stlAudit = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/stlManage/StlAudit'));
    loadEnd();
  }, 'stlAudit');
}

//结算业务
const stlBusiness = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/stlManage/StlBusiness'));
    loadEnd();
  }, 'stlBusiness');
}

//分润管理
const stlShrManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/stlShrManage/StlShrManage'));
    loadEnd();
  }, 'stlShrManage');
}

//分润审核
const stlShrVerifyManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/sms/stlShrManage/StlShrVerifyManage'));
    loadEnd();
  }, 'stlShrVerifyManage');
}

export function getSmsRoutes(app, onEnter) {
  return [
    { path: '/sms/chkManage/chnChkSum', getComponent: chnChkSum, onEnter },
    { path: '/sms/chkManage/chnChkDoubtManage', getComponent: chnChkDoubtManage, onEnter },
    { path: '/sms/chkManage/chnChkErrorManage', getComponent: chnChkErrorManage, onEnter },
    { path: '/sms/chkManage/chnChkErrorAudit', getComponent: chnChkErrorAudit, onEnter },
    { path: '/sms/clrManage/clearingSumManage', getComponent: clearingSumManage, onEnter },
    { path: '/sms/clrManage/clearingBusinessManage', getComponent: clearingBusinessManage, onEnter },
    { path: '/sms/stlManage/stlOrderManage', getComponent: stlOrderManage, onEnter },
    { path: '/sms/stlManage/stlManage', getComponent: stlManage, onEnter },
    { path: '/sms/stlManage/stlAudit', getComponent: stlAudit, onEnter },
    { path: '/sms/stlManage/stlBusiness', getComponent: stlBusiness, onEnter },
    { path: '/sms/stlShrManage/stlShrManage', getComponent: stlShrManage, onEnter },
    { path: '/sms/stlShrManage/stlShrVerifyManage', getComponent: stlShrVerifyManage, onEnter },
  ];
}

