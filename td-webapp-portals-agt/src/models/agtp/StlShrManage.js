import * as service from '../../services/agtp/stlShrManage';
import { parseResponse } from '../../utils/request';
import * as i18n from '../../utils/i18n';
import { callNotice } from '../../utils/alert';

const commonMap = i18n.commonMap();

const namespace = 'stlShrManage';
const enterPath = '/agtp/tranManage/StlShrManage';

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
    tableSelects: [],
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    stlShrtableList: [],
    stlShrtableLoading: false,
    stlShrtableTotal: 0,
    stlShrtableCurrentPage: 1,
    stlShrTableParam: { currentPage: 1 },
    data: {},
    infoModalVisible: false,
    infoPageTableModalVisible: false,
    infoBusinessModalVisible: false,

    //分润业务详情列表
    stlBusinessShrtableList: [],
    stlBusinessShrtableLoading: false,
    stlBusinessShrtableTotal: 0,
    stlBusinessShrtableCurrentPage: 1,
    stlBusinessShrTableParam: { currentPage: 1 },
    infoBusinessPageTableModalVisible: false,
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
      yield put(tableLoadOpt);
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
    // query doubt detail
    * queryTransactonList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryTransactonList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { stlShrtableList: detail.rspList, stlShrtableTotal: detail.total, stlShrtableCurrentPage: 1, infoPageTableModalVisible: true },
        });
      }
    },

    * apply({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.apply, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg, 'success');
        yield put({
          type: 'queryList',
          payload: { tableParam: { currentPage: 1 } },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    // query doubt detail
    * queryBusinessOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryBusinessOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { data: detail.rspData, infoBusinessModalVisible: true },
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
