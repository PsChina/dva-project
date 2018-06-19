import * as service from '../../services/sms/chnChkError';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const namespace = 'chnChkErrorManage';
const enterPath = '/sms/chkManage/chnChkErrorManage';

const commonMap = i18n.commonMap();

const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};

export default {
  namespace,
  state: {
    advExpand: false,
    tableSelects: [],
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,

    infoModalVisible: false,
    data: {},
    detailFormData: {},
    detailModalVisible: false,
    errorAccDealModalVisible: false, //错账处理展示
    errorDealAccData: {}, //错账处理需要的数据
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

    // query error detail
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
          payload: { data: detail.rspData, detailModalVisible: true },
        });
      }
    },

    * exportData({ payload }, { call, put }) {
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

    * errorAccDeal({ payload }, { call, put }) {
      const res = yield call(service.dealError, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        const res = yield call(service.queryList, { });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: '1' },
          });
        }
        callNotice(commonMap.success, commonMap.successInfo, 'success');
      } else {
        callNotice(commonMap.error, commonMap.errorInfo, 'error');
      }
      yield put({
        type: 'updateState',
        payload: { errorAccDealModalVisible: false },
      });
    },

  },

  reducers: {
    // update simple state value
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'detail':
          newState = { ...state, detailFormData: action.payload.data, detailModalVisible: !state.detailModalVisible, defaultActiveKey: '1' };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'auditHis':
          newState = { ...state, auditHisData: action.payload.data, auditHisModalVisible: !state.auditHisModalVisible };
          break;
        default:
          break;
      }
      return newState;
    },
  },
};
