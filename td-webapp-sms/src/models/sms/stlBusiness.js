import * as service from '../../services/sms/stlBusiness';
import * as chnService from '../../services/sms/channel';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const namespace = 'stlBusiness';
const enterPath = '/sms/stlManage/stlBusiness';

const commonMap = i18n.commonMap();

const tableLoadOpt = {
  type: 'updateState',
  payload: { tableSelects: [], tableLoading: true },
};
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};

const stlTableLoadOpt = {
  type: 'updateState',
  payload: { stlTableLoading: true },
};
const stlTableLoadFinOpt = {
  type: 'updateState',
  payload: { stlTableLoading: false },
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

    stlDetailModalVisible: false, //结算明细弹出框

    chnList: [],

    infoModalVisible: false,
    data: {},
    detailFormData: {},
    detailModalVisible: false,
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
          payload: { tableList: detail.rspList, stlTableList: detail.rspList, tableTotal: detail.total, stlTableTotal: detail.total, stlTableCurrentPage: payload.tableParam.currentPage, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },

        // query need check channel list
    * queryChnList({ payload }, { call, put }) {
      const res = yield call(chnService.queryList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnList: detail.rspList },
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
          payload: { data: detail.rspData, detailModalVisible: true },
        });
      }
    },
    * updateStatus({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.updateList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateStatusSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * exportData({ payload }, { call, put }) {
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
    * handleStlDetail({ payload }, { call, put }) {
      yield put(stlTableLoadOpt);
      const res = yield call(service.qryStlDetail, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { stlTableList: detail.rspList, stlTableTotal: detail.total, stlTableCurrentPage: 1, stlDetailModalVisible: true },
        });
      }
      yield put(stlTableLoadFinOpt);
    },
    * qryStlDetail({ payload }, { call, put }) {
      yield put(stlTableLoadOpt);
      const res = yield call(service.qryStlDetail, { ...payload.stlTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { stlTableList: detail.rspList, stlTableTotal: detail.total, stlTableCurrentPage: payload.stlTableParam.currentPage },
        });
      }
      yield put(stlTableLoadFinOpt);
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
        case 'detail':
          newState = { ...state, detailFormData: action.payload.data, detailModalVisible: !state.detailModalVisible, defaultActiveKey: '1' };
          break;
        case 'stlDetail':
          newState = { ...state, auditHisData: action.payload.data, stlDetailModalVisible: !state.stlDetailModalVisible };
          break;
        default:
          break;
      }
      return newState;
    },
  },
};
