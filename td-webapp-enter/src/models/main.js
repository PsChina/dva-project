import qs from 'qs';
import * as service from '../services/main';
import { parseResponse } from '../utils/request';
import { getCookie, getToken, setToken } from '../utils/storage';
import { encode, decode } from '../utils/code';
import { callNotice } from '../utils/alert';
import Config from '../../config/config.json';

import * as i18n from '../utils/i18n';

const commonMap = i18n.commonMap();
// 入口
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

export default {
  namespace: 'main',
  indexPageNamespace: 'indexPage',
  // 初始状态
  state: {
    menuItems: [],
    sysItems: [],
    updatePswVisible: false,
    user: '',
    checkInvalid: false,
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/main') {  // 订阅url地址 当地址变为/main时 调用querySuccess
          dispatch({ type: 'query', payload: {} });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      let user = yield select(state => state.indexPage.user);
      yield put({
        type: 'updateState',
        payload: {
          user: user,
        },
      });
      if (!user) {
        user = getCookie(`${Config.app}_USR`);
      }
      let tk = yield select(state => state.indexPage.tk);
      if (!tk) {
        tk = getToken(user);
      }
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.query, {
        token: tk, userInfo: user,
      });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        console.log('detail', detail)
        const sysItems = detail.rspData.list;
        const menuItems = detail.rspData.menuItems;
        for (let i = 0; i < sysItems.length; i++) {
          const item = sysItems[i];
          let json = JSON.stringify(item);
          console.log(json,item);
          switch (item.sysId) {
            // 权限中心
            case '000': case '9000': {
              // const param = `tk=${encode(tk, 'base64')}&usr=${user}&sys=000`;
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              // item.url = `${item.url}/#/getTkn?${param}`;
              // item.url = `${item.url}/#/querySysMenu?${param}`;
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 账务服务
            case '001': case '9001': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 卡片管理系统
            case '100': case '9100': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 会员管理系统
            case '101': case '9101': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 终端管理系统
            case '102': case '9102': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 通道管理系统
            case '103': case '9103': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 订单管理系统
            case '104': case '9104': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 业务管理系统
            case '200': case '9200': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 清结算管理
            case '301': case '9301': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 风控管理
            case '302': case '9302': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 调度中心
            case '500': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // dubbo管理
            case '510': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 充值管理
            case '600': case '9400': {
              const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
              item.url = `${item.url}/#/?k=${param}`;
              break;
            }
            // 套餐管理
            case '105': 
              {
                const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
                item.url = `${item.url}/#/?k=${param}`;
                break;                
              }
            // 财务管理
            case '106':
              {
                const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
                item.url = `${item.url}/#/?k=${param}`;
                break;
              }
            default:
              break;
          }
        }
        // for (let i = 0; i < menuItems.length; i++) {
        //   const item = sysItems[i];
        //   switch (item.title) {
        //     case 'loginOut': {
        //       const param = encode(`user=${user}&tk=${tk}&sys=${item.sysId}`, 'base64', true)
        //       item.menuClick = `${item.url}/#/?k=${param}`;
        //       break;
        //     }
        //     default:
        //       break;
        //   }
        // }
        yield put({
          type: 'updateState',
          payload: {
            menuItems: menuItems,
            sysItems: sysItems,
          },
        });
      }
    },
    * loginOut({ payload }, { call, put }) {
      // yield put({
      //   type: 'updateState',
      //   payload: { loading: true },
      // });
      const param = parseToken(window.location.href);
      const username = (param === null ? getCookie(`${Config.app}_USR`) : param.user);
      const token = (param === null ? getToken(username) : param.tk);
      console.log('payload', payload)
      const res = yield call(service.loginOut, { ...payload, token });
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
    * updatePsw({ payload }, { call, put }) {
      payload.newPasswd = encode(payload.newPasswd, 'md5');
      payload.oldPasswd = encode(payload.oldPasswd, 'md5');
      payload.newPasswdConfirm = encode(payload.newPasswdConfirm, 'md5');

      console.log('service.updatePsw=>', ...payload)
      const res = yield call(service.updatePsw, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { updatePswVisible: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.updatePswSuccess, 'success');
        // window.location.href = Config.loginUrl;
        setTimeout(() => { window.location.href = Config.loginUrl }, 2000)
      } else {
        yield put({
          type: 'updateState',
          payload: { tk: null, loading: false },
        });
        console.log('windows.location=>', Config.loginUrl)
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    updateState(state, action) {
      // 若为静态数据 可直接mock数据 不通过effects, subscriptions中设置type为querySuccess即可
      // const mock = { menuItems: [...] };
      // return { ...state, ...mock };
      const newState = { ...state, ...action.payload };
      return newState;
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'updatePsw':
          newState = { ...state, updatePswVisible: !state.updatePswVisible };
          break;
        default:
          break;
      }
      return newState;
    },
  },
}
