import * as service from '../../services/sms/clearSum';
import { parseResponse } from '../../utils/request';
// import * as i18n from '../../utils/i18n';

const namespace = 'clearingSumManage';
const enterPath = '/sms/clrManage/clearingSumManage';

const tableLoadOpt = {
  type: 'updateState',
  payload: { tableChannelLoading: true },
};
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableChannelLoading: false },
};

export default {
  namespace,
  state: {
    tableChannelParam: { currentPage: 1 },
    tableChannelLoading: false,
    tableChannelList: [],
    tableChannelTotal: 0,
    tableChannelCurrentPage: 1,
    chnChannelList: [],
    chnChannelTotal: 0,
    chnChannelCurrentPage: 1,
    chnChannelLoading: false,
    chnChannelParam: { currentPage: 1 },
    tablePlatformParam: { currentPage: 1 },
    tablePlatformLoading: false,
    tablePlatformList: [],
    tablePlatformTotal: 0,
    tablePlatformCurrentPage: 1,
    chnPlatformList: [],
    chnPlatformTotal: 0,
    chnPlatformCurrentPage: 1,
    chnPlatformLoading: false,
    chnPlatformParam: { currentPage: 1 },
    channelInfoModalVisible: false,
    platformlInfoModalVisible: false,
    channelInfoTableModalVisible: false,
    platformInfoTableModalVisible: false,
    channelData: {},
    platformData: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryPlatformList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryChannelList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },

  effects: {
      /**
       * 渠道清分查询
       */
    // query doubt result list
    * queryChannelList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableLoading: true },
      });
      const res = yield call(service.queryChannelList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableChannelList: detail.rspList, tableChannelTotal: detail.total, tableChannelCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },
    // query need check channel list
    * queryChannelTransactonList({ payload }, { call, put }) {
      const res = yield call(service.queryChannelTransactonList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnChannelParam: payload.tableParam, chnChannelList: detail.rspList, chnChannelTotal: detail.total, chnChannelCurrentPage: payload.tableParam.currentPage, channelInfoTableModalVisible: true },
        });
      }
    },
    // query doubt detail
    * queryChannelOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryChannelOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { channelData: detail.rspData, channelInfoModalVisible: true },
        });
      }
    },


    /**
     * 平台清分查询
     */
    // query doubt result list
    * queryPlatformList({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.queryPlatformList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tablePlatformList: detail.rspList, tablePlatformTotal: detail.total, tablePlatformCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },
    // query need check channel list
    * queryPlatformTransactonList({ payload }, { call, put }) {
      const res = yield call(service.queryPlatformTransactonList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnPlatformParam: payload.tableParam, chnPlatformList: detail.rspList, chnPlatformTotal: detail.total, chnPlatformCurrentPage: payload.tableParam.currentPage, platformInfoTableModalVisible: true },
        });
      }
    },
    // query doubt detail
    * queryPlatformOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryPlatformOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { platformData: detail.rspData, platformlInfoModalVisible: true },
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
