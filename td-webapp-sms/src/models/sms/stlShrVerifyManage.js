import * as service from '../../services/sms/stlShrVerifyManage';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const commonMap = i18n.commonMap();

const namespace = 'stlShrVerifyManage';
const enterPath = '/sms/stlShrManage/stlShrVerifyManage';

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
    stlShrtableList: [],
    stlShrtableLoading: false,
    stlShrtableTotal: 0,
    stlShrtableCurrentPage: 1,
    stlShrTableParam: { currentPage: 1 },
    data: {},
    infoModalVisible: false,
    infoPageTableModalVisible: false,
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
    // 查询交易明细
    * queryTransactonList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryTransactonList, { ...payload.stlShrTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { stlShrtableList: detail.rspList, stlShrtableTotal: detail.total, stlShrtableCurrentPage: payload.stlShrTableParam.currentPage, infoPageTableModalVisible: true },
        });
      }
    },

    // 分润审核
    * verifySubmit({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.verifySubmit, { ...payload.param });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg, 'success');
        yield put({
          type: 'updateState',
          payload: { infoModalVisible: false },
        });
        yield put({
          type: 'queryList',
          payload: { tableParam: { currentPage: 1 } },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
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
