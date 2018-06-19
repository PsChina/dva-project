import qs from 'qs';
import * as service from '../services/indexPage';
import { parseResponse } from '../utils/request';
import { callNotice } from '../utils/alert';
import { encode, decode } from '../utils/code';
import { getCookie, getToken, setToken } from '../utils/storage';
import * as i18n from '../utils/i18n';
import Config from '../../config/config.json';
// import { location } from 'react-router/lib/PropTypes';
// 注释 location
const mmsMenus = [
  {
    key: '100',
    icon: 'team',
    text: '会员管理',
    children: [
      { key: '100-01', text: '个人会员管理', to: 'mms/memberManage/personalMemberManage' },
      { key: '100-02', text: '企业商户管理', to: 'mms/memberManage/merchantManage' },
      { key: '100-03', text: '商户门店管理', to: 'mms/memberManage/merchantStoreManage' },
      { key: '100-04', text: '代理商管理', to: 'mms/memberManage/agentManage' },
      { key: '100-05', text: '服务商管理', to: '#' },
    ],
  },
  {
    key: '101',
    icon: 'solution',
    text: '会员申请',
    children: [
      { key: '101-01', text: '个人会员申请', to: 'mms/memberApply/personalMemberApply' },
      { key: '101-02', text: '企业商户申请', to: 'mms/memberApply/merchantApply' },
      { key: '101-03', text: '商户门店申请', to: 'mms/memberApply/merchantStoreApply' },
      { key: '101-04', text: '代理商申请', to: 'mms/memberApply/agentApply' },
      { key: '101-05', text: '服务商申请', to: '#' },
      { key: '101-06', text: '企业商户申请（国际版）', to: 'mms/memberApply/merchantGlobalApply' },
    ],
  },
  {
    key: '102',
    icon: 'user',
    text: '会员角色管理',
    children: [
      { key: '102-01', text: '商户角色管理', to: 'mms/memberRoleManage/merchantRoleManage' },
      { key: '102-02', text: '门店角色管理', to: 'mms/memberRoleManage/merchantStoreRoleManage' },
      { key: '102-03', text: '代理商角色管理', to: 'mms/memberRoleManage/agentRoleManage' },
      { key: '102-04', text: '服务商角色管理', to: '#' },
    ],
  },
  {
    key: '103',
    icon: 'solution',
    text: '会员用户管理',
    children: [
      { key: '103-01', text: '商户用户管理', to: 'mms/memberUserManage/merchantUsrManage' },
      { key: '103-02', text: '门店人员管理', to: 'mms/memberUserManage/merchantStoreUsrManage' },
      { key: '103-03', text: '代理商用户管理', to: 'mms/memberUserManage/agentUsrManage' },
      { key: '103-04', text: '服务商用户管理', to: '#' },
    ],
  },
  {
    key: '104',
    icon: 'laptop',
    text: '产品',
    children: [
      { key: '104-01', text: '产品管理', to: 'product/manage' },
    ],
  },
  {
    key: '105',
    icon: 'laptop',
    text: '任务管理',
    children: [
      { key: '105-01', text: '我的申请', to: '#' },
      { key: '105-02', text: '我的代办', to: 'mms/taskManage/taskTodoManage' },
      { key: '105-03', text: '我的已办', to: '#' },
    ],
  },
];
const commonMap = i18n.commonMap();
/**
 * 解析token
 */
const parseToken = (url) => {
  const key = '?k=';
  const idx = url.indexOf(key);
  let param = null;
  if (idx !== -1) {
    let str = '';
    const nurl = url.substring(idx);
    const idx2 = nurl.indexOf('&');
    str = nurl.substring(key.length, idx2 === -1 ? url.length : idx2);
    param = (str !== '' ? decode(str, 'base64', true) : '');  // should url safe
    const p = (param !== '' ? qs.parse(param) : {});
    setToken(p.user, p.tk);
    return p;
  }
  return param;
}
/**
 * 通过递归方式构建面包屑导航数据
 * 菜单的key必须满足一定规则 如：
 * 1, 11, 12, 111, 112 或 1, 1-1, 1-2, 1-1-1, 1-1-2
 * 叶子菜单的key能够查找到父菜单的key，并且位置在第一位
 */
const buildBreadPath = (menuItems, key) => {
  let path = '';
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    if (key.indexOf(item.key) === 0) {
      path = item.text;
      if (item.children && item.children.length > 0) {
        const cPath = buildBreadPath(item.children, key);
        path += `,${cPath}`;
      }
    }
  }
  return path;
}

export default {
  namespace: 'indexPage',
  state: {
    loginVisible: false,
    loginLoading: false,
    username: '',
    breadPath: [commonMap.home],
    menuItems: [],
    // menuItems: mmsMenus,
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          console.log('location内容为：', location);
          dispatch({
            type: 'updateState',
            payload: { breadPath: [commonMap.home] },
          });
          try {
            const param = parseToken(window.location.href);
            const username = (param === null ? getCookie(`${Config.app}_USR`) : param.user);
            const token = (param === null ? getToken(username) : param.tk);
            dispatch({
              type: 'querySysMenu',
              payload: { token, username },  // 101预警监控平台
            });
          } catch (e) {
            console.log('parse tk error');
          }
        }
      });
    },
  },
  effects: {
    * querySysMenu({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { username: payload.username },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.querySysMenu, {
        token: payload.token, sysId: '101', language: Config.language,
      });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            menuItems: detail.rspData.usrLoginAuthList,
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failLogin, 'error');
        // setTimeout(() => {
        //   window.location.href = Config.loginUrl;
        // }, 3200);
      }
    },
    * relogin({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { loginLoading: true },
      });
      const username = getCookie(`${Config.app}_USR`);
      const token = getToken(username);
      const param = {
        usrName: payload.username,
        usrPsw: encode(payload.password, 'md5'),
        token: token,
      }
      const res = yield call(service.relogin, param);
      const detail = parseResponse(res);
      //登录时返回的参数200代表成功  参数值放在rspData
      if (detail.rspCod === '200') {
        const token = detail.rspData.token;
        setToken(payload.username, token);
        yield put({
          type: 'updateState',
          payload: { loginLoading: false, loginVisible: false },
        });
        //如果重新登陆成功，再发个请求加载菜单栏
        const res2 = yield call(service.querySysMenu, {
          token: token, sysId: '101', language: Config.language,
        });
        const detail2 = parseResponse(res2);
        if (detail2.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: {
              menuItems: detail2.rspData.usrLoginAuthList,
            },
          });
        } else {
          callNotice(commonMap.fail, detail2.rspMsg || commonMap.failLogin, 'error');
          // setTimeout(() => {
          //   window.location.href = Config.loginUrl;
          // }, 3200);
        }
      } else {
        yield put({
          type: 'updateState',
          payload: { loginLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    * logout({ payload }, { call, put }) {
      const param = parseToken(window.location.href);
      const username = (param === null ? getCookie(`${Config.app}_USR`) : param.user);
      const token = (param === null ? getToken(username) : param.tk);
      const res = yield call(service.logout, { ...payload, token });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload,
        });
        window.location.href = Config.loginUrl;
      } else {
        //removeToken(payload.usrName);
        yield put({
          type: 'updateState',
          payload: { tk: null, loading: false },
        });
        console.log('windows.location=>', Config.loginUrl)
        window.location.href = Config.loginUrl;
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    // 公用状态更新方法 参数的属性和状态的属性一致即可
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    updateBreadPath(state, action) {
      const path = `${commonMap.home},${buildBreadPath(state.menuItems, action.payload.key.toString())}`;
      return { ...state, breadPath: path.split(',') };
    },
  },
}
