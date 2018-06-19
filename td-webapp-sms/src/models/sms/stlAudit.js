import * as service from '../../services/sms/stlAudit';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const namespace = 'stlAudit';
const enterPath = '/sms/stlManage/stlAudit';

const commonMap = i18n.commonMap();

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
    advExpand: false, //高级搜索
    //主页面结算查询 table props
    tableSelects: [],
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,

    //结算明细table props
    stlTableParam: { currentPage: 1 },
    stlTableLoading: false,
    stlTableList: [],
    stlTableTotal: 0,
    stlTableCurrentPage: 1,

    data: {},
    detailFormData: {},
    stlAuditModalVisible: false,
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
      // query result list
    * queryList({ payload }, { call, put }) {
      console.log('queryList');
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
      // query one detail
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
          payload: { data: detail.rspData, stlAuditModalVisible: true },
        });
      }
    },
      //audit submit
    * handleAuditSubmit({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.transferAudit, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { stlAuditModalVisible: false },
        });
        const res = yield call(service.queryList, {});
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: detail.rspList, stlTableList: detail.rspList, tableTotal: detail.total, stlTableTotal: detail.total, stlTableCurrentPage: 1, tableCurrentPage: 1 },
          });
        }
        callNotice(commonMap.success, commonMap.success, 'success');
      } else {
        callNotice(commonMap.error, detail.rspMsg, 'error');
      }
      yield put(tableLoadFinOpt);
    },
  },

  reducers: {
    //高级搜索
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
    },
    // update simple state value
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'stlAuditDetail':
          newState = { ...state, detailFormData: action.payload.data, stlAuditModalVisible: !state.stlAuditModalVisible, defaultActiveKey: '1' };
          break;
        default:
          break;
      }
      return newState;
    },
  },
};
