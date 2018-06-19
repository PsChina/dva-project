import * as service from '../services/home';
import { parseResponse } from '../utils/request';
import { callNotice } from '../utils/alert';
import * as i18n from '../utils/i18n';

const commonMap = i18n.commonMap();
const enterPath = '/home';

export default {
  namespace: 'home',
  state: {
    chkDateList: [],
    chkTotCntList: [],
    sucTotCntList: [],
    todayCheckInfo: {
      doubtCount: '0',
      errorCount: '0',
    },

    stlDateList: [],
    shouldStlAmtList: [],
    settledAmtList: [],
    todaySettleInfo: {
      shouldStlAmt: '0',
      settledAmt: '0',
    },

    monthList: [],
    shaTotCostList: [],
    monthShareInfo: {
      shaTotCost: '0',
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryCheckCount', payload: { countFlg: 15, ccyCod: 'CNY' } });
          dispatch({ type: 'querySettleCount', payload: { countFlg: 15, ccyCod: 'CNY' } });
          dispatch({ type: 'queryShareCount', payload: { countFlg: 6, ccyCod: 'CNY' } });
        }
      });
    },
  },

  effects: {
    // query check graphic data
    * queryCheckCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryCheckCount, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            chkDateList: detail.rspData.chkDateList,
            chkTotCntList: detail.rspData.chkTotCntList,
            sucTotCntList: detail.rspData.sucTotCntList,
            todayCheckInfo: detail.rspData.todayCheckInfo,
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },

    // query settlement graphic data
    * querySettleCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.querySettleCount, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            stlDateList: detail.rspData.stlDateList,
            shouldStlAmtList: detail.rspData.shouldStlAmtList,
            settledAmtList: detail.rspData.settledAmtList,
            todaySettleInfo: detail.rspData.todaySettleInfo,
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },

    * queryShareCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryShareCount, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            monthList: detail.rspData.monthList,
            shaTotCostList: detail.rspData.shaTotCostList,
            monthShareInfo: detail.rspData.monthShareInfo,
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
}

