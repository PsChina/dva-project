import * as service from '../../services/pms/routerMerchantBankcard';
import * as merService from '../../services/pms/merchant';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'routerMerBankcardManage';
const objectId = 'chnId';
const enterPath = '/pms/routerManage/routerMerBankcardManage';
// 基础公共信息
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('pms/routerMerBankcard');
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};
const routerTableLoadOpt = {
  type: 'updateState',
  payload: { routerTableLoading: true },
};
const routerTableLoadFinOpt = {
  type: 'updateState',
  payload: { routerTableLoading: false },
};

export default {
  namespace,
  state: {
    // 商户查询面板的状态
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    tableSelects: [],
    // 商户渠道查询面板的状态
    routerPayloadMerInfo: {},
    routerPayloadCurrency: { currency: 'TWD' },
    routerTableParam: { currentPage: 1 },
    routerTableLoading: false,
    routerTableList: [],
    routerTableTotal: 0,
    routerTableCurrentPage: 1,
    routerTableSelects: [],
    routerAddModalVisible: false,

    // 渠道商户新增面板状态
    routerPayloadAddSelectCurrency: { currency: 'TWD' },
    addModalTableList: [],
    addModalTableTotal: 0,
    addModalTableCurrentPage: 1,
    addModalTableParam: { currentPage: 1 },
    addModalTableLoading: false,
    addModalTableRowSelects: [],

    // 筛选路由模型面板
    routerApplyModalVisible: false,
    routerApplyModalTableList: [],
    routerApplyModalTableTotal: 0,
    routerApplyModalTableCurrentPage: 1,
    routerApplyModalTableParam: { currentPage: 1 },
    routerApplyModalTableLoading: false,
    routerApplyModalTableRowSelects: [],
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryMerList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },
  effects: {
    * queryMerList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableSelects: [], tableLoading: true },
      });
      const res = yield call(merService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },
    * queryOneList({ payload }, { call, put }) {
      // routerPayloadMerInfo：当前商户信息
      yield put({
        type: 'updateState',
        payload: { ...payload, routerTableSelects: [], routerTableLoading: true, routerPayloadMerInfo: payload },
      });
      const res = yield call(service.queryOneList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { routerTableList: detail.rspList, routerTableTotal: detail.total, routerTableLoading: false, routerTableCurrentPage: 1 },
        });
      }
      yield put(tableLoadFinOpt);
    },
    * queryRoutersList({ payload }, { call, put }) {
      if (payload.data.merId === null || payload.data.merId === undefined) {
        callNotice(commonMap.warning, bizMap.nullMerIdMsg || commonMap.failInfo, 'warning');
      } else {
        yield put({
          type: 'updateState',
          payload: { ...payload, routerTableSelects: [], routerTableLoading: true },
        });
        const res = yield call(service.queryRoutersList, { ...payload.data });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: detail.rspList, routerTableTotal: detail.total, routerTableLoading: false, routerTableCurrentPage: payload.routerTableParam.currentPage },
          });
        }
        yield put(routerTableLoadFinOpt);
      }
    },
    * queryAllList({ payload }, { call, put }) {
      if (payload.data.merId === null || payload.data.merId === undefined) {
        callNotice(commonMap.warning, bizMap.nullMerIdMsg || commonMap.failInfo, 'warning');
      } else {
        if (payload.visibleType !== 1) {
          yield put({
            type: 'toggleModal',
            payload: { type: 'add' },
          });
        }
        yield put({
          type: 'updateState',
          payload: { ...payload, addModalTableSelects: [], addModalTableLoading: true },
        });
        const res = yield call(service.queryAllList, { ...payload.data });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { addModalTableList: detail.rspList, addModalTableTotal: detail.total, addModalTableLoading: false, addModalTableCurrentPage: payload.addModalTableParam.currentPage },
          });
        }
        yield put(routerTableLoadFinOpt);
      }
    },
    * setDefualt({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, routerUpdateFormSubmit: true },
      });
      const res = yield call(service.setDefualt, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        yield put(routerTableLoadOpt);
        const param = {};
        param.merId = payload.data.merId;
        param.currency = payload.data.currency;
        const res = yield call(service.queryRoutersList, param);
        const result = parseResponse(res);
        yield put(routerTableLoadFinOpt);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: result.rspList, routerTableTotal: result.total, routerTableCurrentPage: 1 },
          });
        }
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * deleteOne({ payload }, { call, put }) {
      yield put(routerTableLoadOpt);
      const res = yield call(service.deleteOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        // const tableParam = yield select(state => state[namespace].routerTableParam);
        yield put(routerTableLoadOpt);
        const param = {};
        param.merId = payload.data.merId;
        const res = yield call(service.queryRoutersList, param);
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: result.rspList, routerTableTotal: result.total, routerTableCurrentPage: 1 },
          });
        }
        yield put(routerTableLoadFinOpt);
      } else {
        yield put(routerTableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * addOne({ payload }, { call, put, select }) {
      const res = yield call(service.addOne, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { routerAddModalVisible: false, routerAddFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        const tableParam = yield select(state => state[namespace].routerTableParam);
        yield put({
          type: 'updateState',
          payload: { routerTableParam: [], routerTableLoading: true },
        });
        const param = {};
        param.merId = payload.data.merId;
        param.currency = yield select(state => state[namespace].routerPayloadCurrency.currency);
        const res = yield call(service.queryRoutersList, param);
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: result.rspList, routerTableTotal: result.total, routerTableLoading: false, routerTableCurrentPage: 1 },
          });
        }
        yield put(routerTableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { routerAddFormSubmit: false, routerTableLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryModList({ payload }, { call, put }) {
      if (payload.data.merId === null || payload.data.merId === undefined) {
        callNotice(commonMap.warning, bizMap.nullMerIdMsg || commonMap.failInfo, 'warning');
      } else {
        if (payload.visibleType !== 1) {
          yield put({
            type: 'toggleModal',
            payload: { type: 'applyMod' },
          });
        }
        yield put({
          type: 'updateState',
          payload: { ...payload, routerApplyModalTableSelects: [], routerApplyModalTableLoading: true },
        });
        const res = yield call(service.queryModList, { ...payload.data });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerApplyModalTableList: detail.rspList, routerApplyModalTableTotal: detail.total, routerApplyModalTableLoading: false, routerApplyModalTableCurrentPage: payload.routerApplyModalTableParam.currentPage },
          });
        }
      }
    },
    // 待完成
    * addOneMod({ payload }, { call, put, select }) {
      const res = yield call(service.addOneMod, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { routerApplyModalVisible: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put({
          type: 'updateState',
          payload: { routerTableList: [], routerTableParam: [], routerTableLoading: true },
        });
        const param = {};
        param.merId = payload.data.merId;
        param.currency = yield select(state => state[namespace].routerPayloadMerInfo.currency);
        const res = yield call(service.queryRoutersList, param);
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: result.rspList, routerTableTotal: result.total, routerTableLoading: false, routerTableCurrentPage: 1 },
          });
        }
        yield put(routerTableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { routerAddFormSubmit: false, routerTableLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    // toggleAdvExpand(state) {
    //   return { ...state, advExpand: !state.advExpand };
    // },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'add':
          newState = { ...state, routerAddModalVisible: !state.routerAddModalVisible };
          break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'applyMod':
          newState = { ...state, routerApplyModalVisible: !state.routerApplyModalVisible };
          break;
        default:
          break;
      }
      return newState;
    },
    updateSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateModalVisible: false };
    },
    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */
    updateStatusSuccess(state, action) {
      const ids = action.payload.ids;
      const status = action.payload.status;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, status: status };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },
  },
};
