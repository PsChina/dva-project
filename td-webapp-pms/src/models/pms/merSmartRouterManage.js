import * as service from '../../services/pms/merchantSmartRouter';
import * as miniFormService from '../../services/pms/mer';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'merSmartRouterManage';
const objectId1 = 'merId';
const objectId2 = 'txnChannel';
const enterPath = '/pms/routerManage/merSmartRouterManage';
// 基础公共信息
const commonMap = i18n.commonMap();
const tableLoadOpt = {
  type: 'updateState',
  payload: { tableSelects: [], tableLoading: true },
};
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};
const miniFormTableLoadFinOpt = {
  type: 'updateState',
  payload: { miniFormTableLoading: false },
};

export default {
  namespace,
  state: {
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    tableSelects: [],

    advExpand: false,

    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},

    addModalVisible: false,
    addFormSubmit: false,
    addFormData: {},

    infoModalVisible: false,
    infoTableData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    miniFormTableParam: { currentPage: 1 },
    miniFormTableLoading: false,
    miniFormTableList: [],
    miniFormTableTotal: 0,
    miniFormTableCurrentPage: 1,
    miniFormVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryMerList', payload: { miniFormTableParam: { currentPage: 1 } } });
        }
      });
    },
  },
  effects: {
    // query merchant list
    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableSelects: [], tableLoading: true },
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

    // add merchant
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.addOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        const tableParam = yield select(state => state[namespace].tableParam);
        yield put(tableLoadOpt);
        const res = yield call(service.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total, addModalVisible: false },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { addFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    // update merchant
    * updateOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    // delete disabled merchant
    * deleteList({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(service.deleteList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        const tableParam = yield select(state => state[namespace].tableParam);
        yield put(tableLoadOpt);
        const res = yield call(service.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryMerList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, miniFormTableLoading: true },
      });
      const res = yield call(miniFormService.queryList, { ...payload.miniFormTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { miniFormTableList: detail.rspList, miniFormTableTotal: detail.total, miniFormTableCurrentPage: payload.miniFormTableParam.currentPage },
        });
      }
      yield put(miniFormTableLoadFinOpt);
    },
    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
    // enable or disable
    * updateStatus({ payload }, { call, put }) {
      // console.log('payload', payload);
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
  },
  reducers: {

    // update simple state
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    // toggle simple modal
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'add':
          newState = { ...state, addModalVisible: !state.addModalVisible, miniFormVisible: false };
          break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'mer':
          newState = { ...state, addFormData: action.payload.data, miniFormVisible: !state.miniFormVisible };
          break;
        default:
          break;
      }
      return newState;
    },

    // flush table
    updateSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId1] === newItem[objectId1] && item[objectId2] === item[objectId2]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateModalVisible: false, authUpdFormSubmit: false, authUpdModalVisible: false };
    },
    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */

    // flush table
    updateStatusSuccess(state, action) {
      const merIds = action.payload.merIds;
      const txnChannels = action.payload.txnChannels;
      const smartRoute = action.payload.smartRoute;
      const newTableList = state.tableList.map((item) => {
        if (merIds.indexOf(item[objectId1]) !== -1 && txnChannels.indexOf(item[objectId2]) !== -1) {
          return { ...item, smartRoute: smartRoute };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },

    // toggle limit component
    toggleAdvExpand(state, action) {
      return { ...state, advExpand: !state.advExpand, updateFormData: action.payload.dat };
    },
  },
};
