import { routerRedux } from 'dva/router';
import * as service from '../services/login';
import { parseResponse } from '../utils/request';
import { callNotice } from '../utils/alert';
import { encode } from '../utils/code';
import { setToken, removeToken } from '../utils/storage';
import * as i18n from '../utils/i18n';

import Config from '../../config/config.json';

const commonMap = i18n.commonMap();

export default {
  namespace: 'indexPage',
  state: {
    user: '',
    tk: null,
    loading: false,
  },
  subscriptions: {},
  effects: {
    * login({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      payload.usrPsw = encode(payload.usrPsw, 'md5');
      console.log('login',payload);
      const res = yield call(service.login, payload);
      const detail = parseResponse(res);
      //登录时返回的参数200代表成功   参数值放在rspData
      if (detail.rspCod === '200') {
        const token = detail.rspData.token;
        setToken(payload.usrName, token);
        yield put({
          type: 'updateState',
          payload: { user: payload.usrName, tk: token, loading: false },
        });
        // 分系统菜单
        // if (payload.sysMod === false) {
        //   yield put(routerRedux.replace({ pathname: '/main' }));
        // } else if (payload.sysMod === true) { // 全系统菜单
        //   const param = encode(`user=${payload.usrName}&tk=${token}`, 'base64', true)
        //   window.location.href = `${Config.wholeSystemsUrl}/#/?k=${param}`;
        // }
        // 分系统菜单
        yield put(routerRedux.replace({ pathname: '/main' }));
      } else {
        removeToken(payload.usrName);
        yield put({
          type: 'updateState',
          payload: { tk: null, loading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    updateState(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
}
