import qs from 'qs';
import * as service from '../services/indexPage';
import { parseResponse } from '../utils/request';
import { callNotice } from '../utils/alert';
import { encode, decode } from '../utils/code';
import { getCookie, getToken, setToken } from '../utils/storage';
import * as i18n from '../utils/i18n';
import Config from '../../config/config.json';

const commonMap = i18n.commonMap();

// const tmsMenu = [
//   {
//     key: '102-01',
//     icon: 'team',
//     text: '终端数据管理',
//     children: [
//       { key: '102-01-11', text: '终端厂商管理', to: 'tms/terminalManage/terminalCompanyManage' },
//       { key: '102-01-12', text: '终端型号管理', to: 'tms/terminalManage/terminalModelManage' },
//       { key: '102-01-13', text: '终端密钥管理', to: 'tms/terminalManage/terminalKeyManage' },
//       { key: '102-01-14', text: '终端固件管理', to: 'tms/terminalManage/terminalFirmwareManage' },
//       { key: '102-01-15', text: '终端应用管理', to: 'tms/terminalManage/terminalAppManage' },
//       // { key: '102-01-16', text: '终端参数管理', to: 'tms/terminalManage/terminalParamManage' },
//       { key: '102-01-17', text: '终端参数模版', to: 'tms/terminalManage/terminalParamTemp' },
//     ],
//   },
//   {
//     key: '102-02',
//     icon: 'solution',
//     text: '终端信息管理',
//     children: [
//       { key: '102-02-21', text: '终端入库', to: 'tms/terminalInfoManage/terminalStockAdd' },
//       { key: '102-02-22', text: '终端库存管理', to: 'tms/terminalInfoManage/terminalStockManage' },
//       { key: '102-02-23', text: '终端信息管理', to: 'tms/terminalInfoManage/terminalManage' },
//       { key: '102-02-24', text: '终端日志管理', to: 'tms/terminalInfoManage/terminalLogManage' },
//     ],
//   },
//   {
//     key: '102-03',
//     icon: 'user',
//     text: '终端会员管理',
//     children: [
//       { key: '102-03-31', text: '终端代理商管理', to: 'tms/terminalBindManage/terminalAgentManage' },
//       { key: '102-03-32', text: '终端商户管理', to: 'tms/terminalBindManage/terminalMerManage' },
//     ],
//   },
// ];
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
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
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
        token: payload.token, sysId: '102', language: Config.language,
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
        const res2 = yield call(service.querySysMenu, {
          token: token, sysId: '102', language: Config.language,
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
