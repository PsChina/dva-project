import * as service from '../../services/sms/chnChkSum';
import { parseResponse } from '../../utils/request';

const namespace = 'chnChkSum';
const enterPath = '/sms/chkManage/chnChkSum';

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

    sucTableLoading: false,
    sucTableList: [],
    sucTableTotal: 0,
    sucTableCurrentPage: 1,
    sucModalVisible: false,
    sucQueryParam: {},

    secSumTableProps: {}, // secSumPageTable props
    expandedRowKeys: [],
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
    // query channel check result list
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

    // query success check list
    * querySuccessList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, sucTableLoading: true, sucModalVisible: true },
      });
      const res = yield call(service.querySuccessList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { sucTableList: detail.rspList, sucTableTotal: detail.total, sucTableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put({
        type: 'updateState',
        payload: { sucTableLoading: false, sucQueryParam: payload.tableParam },
      });
    },

    // show second gather summary
    * handleSecSumOpen({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { secSumTableProps: { tableLoading: true } },
      });

      const expandedRowKeysTemp = [];
      expandedRowKeysTemp.push(payload.chkSumId);
      const res = yield call(service.querySecList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { expandedRowKeys: expandedRowKeysTemp, secSumTableProps: { tableLoading: false, tableList: detail.rspList } },
        });
      }
    },

    * handleSecSumClose({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: { expandedRowKeys: [] },
      });
    },

  },

  reducers: {
    // update simple state value
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
