import qs from 'qs';
import * as service from '../services/indexPage';
import { parseResponse } from '../utils/request';
import { callNotice } from '../utils/alert';
import { encode, decode } from '../utils/code';
import { getCookie, getToken, setToken } from '../utils/storage';
import * as i18n from '../utils/i18n';
import Config from '../../config/config.json';

const commonMap = i18n.commonMap();
// const basMenu = [
//   {
//     key: '000-01',
//     icon: 'setting',
//     text: '系统管理',
//     children: [
//       { key: '000-01-01', text: '用户管理', to: 'bas/sysManage/userManage' },
//       { key: '000-01-02', text: '角色管理', to: 'bas/sysManage/roleManage' },
//       { key: '000-01-03', text: '菜单管理', to: 'bas/sysManage/menuManage' },
//       { key: '000-01-04', text: '机构管理', to: 'bas/sysManage/orgManage' },
//       { key: '000-01-05', text: '密码修改', to: 'bas/sysManage/passwordUpdate' },
//     ],
//   },
//   {
//     key: '000-02',
//     icon: 'solution',
//     text: '日志管理',
//     children: [
//       { key: '000-02-01', text: '日志管理', to: 'bas/logManage/logManage' },
//     ],
//   },
//   {
//     key: '000-03',
//     icon: 'user',
//     text: '服务中心(dubbo)',
//     children: [
//       { key: '000-03-01', text: '服务', to: 'bas/dubbo/services' },
//       { key: '000-03-02', text: '应用', to: 'bas/dubbo/applications' },
//       { key: '000-03-03', text: '机器', to: 'bas/dubbo/addresses' },
//       { key: '000-03-04', text: '提供者', to: 'bas/dubbo/providers' },
//       { key: '000-03-05', text: '消费者', to: 'bas/dubbo/consumers' },
//       { key: '000-03-06', text: '负载均衡', to: 'bas/dubbo/dubbo/loadbalances' },
//     ],
//   },
//   {
//     key: '000-04',
//     icon: 'user',
//     text: '调度中心(xxl-job)',
//     children: [
//       { key: '000-04-01', text: '调度管理', to: 'bas/jobTirgger/jobTriggerInfoManage' },
//       { key: '000-04-02', text: '调度日志', to: 'bas/jobTirgger/jobTriggerLogManage' },
//     ],
//   },
//   {
//     key: '000-05',
//     icon: 'user',
//     text: '任务中心(workflow)',
//     children: [
//       { key: '000-05-01', text: '节假日维护', to: 'bas/basDataManage/holidayManage' },
//       { key: '000-05-02', text: '银行信息管理', to: 'bas/basDataManage/bankManage' },
//       { key: '000-05-03', text: '卡bin信息管理', to: 'bas/basDataManage/binCardManage' },
//       { key: '000-05-04', text: '地区信息管理', to: 'bas/basDataManage/areaManage' },
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
    // menuItems: basMenu,
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
        token: payload.token, sysId: '000', language: Config.language,
      });
      const detail = parseResponse(res);
      console.log('detail=>', detail)
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            menuItems: detail.rspData.usrLoginAuthList,
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failLogin, 'error');
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
          token: token, sysId: '000', language: Config.language,
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
