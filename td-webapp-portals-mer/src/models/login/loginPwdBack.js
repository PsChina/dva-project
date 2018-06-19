import { routerRedux } from 'dva/router';
import { callNotice } from '../../utils/alert';
import { parseResponse } from '../../utils/request';
import * as i18n from '../../utils/i18n';
import * as service from '../../services/loginPwdBack';

const namespace = 'loginPwdBack';
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('login');

export default {
  namespace: namespace,
  state: {
    currentStep: 0,
    usrName: '',
    verCode: '',
    newPwd: '',
    validLoading: false,
    submitLoading: false,
    checkInvalid: false,
  },
  effects: {
    * sendCode({ payload }, { call, put }) {
      const name = payload.name;
      yield put({
        type: 'updateState',
        payload: { usrName: name },
      });
      const res = yield call(service.sendCode, {
        usrName: name,
      });
      const detail = parseResponse(res);
      //登录时返回的参数200代表成功  参数值放在rspData
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.successInfo, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * validCode({ payload }, { select, call, put }) {
      const { usrName, verCode } = payload;
      const curState = yield select(state => state[namespace]);
      //  if (usrName === curState.usrName) {
      yield put({
        type: 'updateState',
        payload: { usrName, verCode, validLoading: true },
      });
      const res = yield call(service.validCode, { usrName, verCode });
      const detail = parseResponse(res);
      //登录时返回的参数200代表成功  参数值放在rspData
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { validLoading: false, currentStep: 1 },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { validLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      // } else {
      //    callNotice(commonMap.tip, bizMap.emailChanged, 'warning')
      // }
    },
    * updatePwd({ payload }, { select, call, put }) {
      yield put({
        type: 'updateState',
        payload: { submitLoading: true },
      });
      const { newPsw } = payload;
      const curState = yield select(state => state[namespace]);
      const usrName = curState.usrName;
      const res = yield call(service.setPassword, { usrName, newPsw });
      const detail = parseResponse(res);
      //登录时返回的参数200代表成功  参数值放在rspData
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.successInfo, 'success');
        yield put((routerRedux.push('/login')));
        yield put({
          type: 'updateState',
          payload: { submitLoading: false, currentStep: 0 },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
        yield put({
          type: 'updateState',
          payload: { submitLoading: false },
        });
      }
    },
  },
  reducers: {
    // 公用状态更新方法 参数的属性和状态的属性一致即可
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
