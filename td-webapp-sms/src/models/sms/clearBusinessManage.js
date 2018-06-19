import * as service from '../../services/sms/clearBusiness';
import { parseResponse } from '../../utils/request';
// import * as i18n from '../../utils/i18n';

const namespace = 'clearingBusinessManage';
const enterPath = '/sms/clrManage/clearingBusinessManage';

const tableLoadOpt = {
  type: 'updateState',
  payload: { tableSelects: [], tableLoading: true },
};
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};

export default {
  namespace,
  state: {
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    chnList: [],
    infoModalVisible: false,
    clearInfoTableModalVisible: false,
    orderInfoTableModalVisible: false,
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },

  effects: {
    // query doubt result list
    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableLoading: true },
      });
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },

    // query need check channel list
    * queryClearList({ payload }, { call, put }) {
      const res = yield call(service.queryList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnList: detail.rspList, clearInfoTableModalVisible: true },
        });
      }
    },

    // query need check channel list
    * queryOrderList({ payload }, { call, put }) {
      const res = yield call(service.queryList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnList: detail.rspList, orderInfoTableModalVisible: true },
        });
      }
    },

    // query doubt detail
    * queryOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { data: detail.rspData, infoModalVisible: true },
        });
      }
    },
  },

  reducers: {
    // update simple state value
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
