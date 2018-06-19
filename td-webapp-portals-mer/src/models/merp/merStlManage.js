import * as service from '../../services/merp/merStlManage';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const namespace = 'merStlManage';
const enterPath = '/merp/stlManage/merStlManage';

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

const ordTableLoadOpt = {
  type: 'updateState',
  payload: { orderTableLoading: true },
};
const ordTableLoadFinOpt = {
  type: 'updateState',
  payload: { orderTableLoading: false },
};

const businessStlTableLoadOpt = {
  type: 'updateState',
  payload: { businessStlTableLoading: true },
};
const businessStlTableLoadFinOpt = {
  type: 'updateState',
  payload: { businessStlTableLoading: false },
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

    //订单明细table props
    orderTableParam: { currentPage: 1 },
    orderTableLoading: false,
    orderTableList: [],
    orderTableTotal: 0,
    orderTableCurrentPage: 1,

     //展开的结算业务下的--业务结算明细table props
    businessStlTableParam: { currentPage: 1 },
    businessStlTableLoading: false,
    businessStlTableList: [],
    businessStlTableTotal: 0,
    businessStlTableCurrentPage: 1,
    businessStlDetailModalVisible: false, //业务结算明细弹出框
    businessDetailModalVisible: false, //结算业务详情

    stlDetailModalVisible: false, //结算明细弹出框
    stlOrdDetailModalVisible: false, //订单明细弹出框

    //交易明细列表
    stlTradetableList: [],
    stlTradetableLoading: false,
    stlTradetableTotal: 0,
    stlTradetableCurrentPage: 1,
    stlTradeTableParam: { currentPage: 1 },
    stlTradeModalVisible: false,

    data: {},
    detailFormData: {},
    detailModalVisible: false,
    defaultActiveKey: '1',
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
      // query  result list
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
          payload: { data: detail.rspData, detailModalVisible: true },
        });
      }
    },
      //export data
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
      //active key
    * activeKeyChange({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: { defaultActiveKey: payload.defaultActiveKey },
      });
    },
      // handle stl detail
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
      //apply money
    * applyForMoney({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.stlApplyForMoney, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        const res = yield call(service.queryList, { });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: detail.rspList, stlTableList: detail.rspList, tableTotal: detail.total, stlTableTotal: detail.total, stlTableCurrentPage: 1, tableCurrentPage: 1 },
          });
        }
        callNotice(commonMap.success, detail.rspMsg, 'success');
      } else {
        callNotice(commonMap.error, detail.rspMsg, 'error');
      }
      yield put(tableLoadFinOpt);
    },
      //qry stl detail
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
      //handle order detail
    * handleOrdDetail({ payload }, { call, put }) {
      yield put(ordTableLoadOpt);
      const res = yield call(service.qryStlOrdDetail, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { orderTableList: detail.rspList, orderTableTotal: detail.total, orderTableCurrentPage: 1, stlOrdDetailModalVisible: true },
        });
      }
      yield put(ordTableLoadFinOpt);
    },
      //query order detail
    * qryStlOrdDetail({ payload }, { call, put }) {
      yield put(ordTableLoadOpt);
      const res = yield call(service.qryStlOrdDetail, { ...payload.orderTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { orderTableList: detail.rspList, orderTableTotal: detail.total, orderTableCurrentPage: payload.orderTableParam.currentPage },
        });
      }
      yield put(ordTableLoadFinOpt);
    },
      //query one stlbusiness
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
          payload: { data: detail.rspData, businessDetailModalVisible: true },
        });
      }
    },
      //handle stlbusiness detail
    * handleBusinessStlDetail({ payload }, { call, put }) {
      yield put(businessStlTableLoadOpt);
      const res = yield call(service.qryStlBusinessDetail, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { businessStlTableList: detail.rspList, businessStlTableTotal: detail.total, businessStlTableCurrentPage: 1, businessStlDetailModalVisible: true },
        });
      }
      yield put(businessStlTableLoadFinOpt);
    },
      //query stlbusiness detail
    * qryBusinessStlDetail({ payload }, { call, put }) {
      yield put(businessStlTableLoadOpt);
      const res = yield call(service.qryStlBusinessDetail, { ...payload.businessStlTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { businessStlTableList: detail.rspList, businessStlTableTotal: detail.total, businessStlTableCurrentPage: payload.businessStlTableParam.currentPage },
        });
      }
      yield put(businessStlTableLoadFinOpt);
    },
    * handleTradeDetailList({ payload }, { call, put }) {
      const res = yield call(service.qryTradeDetailList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { stlTradetableList: detail.rspList, stlTradetableTotal: detail.total, stlTradetableCurrentPage: 1, stlTradeModalVisible: true },
        });
      }
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
          newState = { ...state, stlDetailModalVisible: !state.stlDetailModalVisible };
          break;
        case 'ordDetail':
          newState = { ...state, stlOrdDetailModalVisible: !state.stlOrdDetailModalVisible };
          break;
        case 'businessDetail':
          newState = { ...state, businessDetailModalVisible: !state.businessDetailModalVisible };
          break;
        case 'businessStlDetail':
          newState = { ...state, businessStlDetailModalVisible: !state.businessStlDetailModalVisible };
          break;
        default:
          break;
      }
      return newState;
    },
  },
};
