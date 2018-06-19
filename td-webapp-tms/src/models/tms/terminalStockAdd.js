import * as service from '../../services/tms/terminalStock';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'terminalStockAdd';
const enterPath = '/tms/terminalInfoManage/terminalStockAdd';
// 基础公共信息
const commonMap = i18n.commonMap();
export default {
  namespace,
  state: {
    submiting: false,
    formData: {},
    companyOptionsData: [],
    filePath: '',
    modelOptionsData: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryCompanyOptionData', payload: {} });
        }
      });
    },
  },
  effects: {
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submiting: true, formData: payload.formData },
      });
      const submitData = yield select(state => state[namespace].formData);
      const res = yield call(service.addOne, { ...submitData });
      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { submiting: false },
      });
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * addBatch({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submiting: true, formData: payload.formData },
      });
      const submitData = yield select(state => state[namespace].formData);
      let res = null;
      if (submitData.addPhynoType === '1') {
        res = yield call(service.stockAddBatch, { ...submitData });
      } else if (submitData.addPhynoType === '2') {
        res = yield call(service.stockAddBatchExcel, { ...submitData });
      }
      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { submiting: false },
      });
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryCompanyOptionData({ payload }, { call, put }) {
      const res = yield call(service.querySelect, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { companyOptionsData: detail.rspList },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryModelOptionData({ payload }, { call, put }) {
      const res = yield call(service.queryModelSelect, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { modelOptionsData: detail.rspList },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * changeFileData({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: { filePath: payload.data },
      });
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
