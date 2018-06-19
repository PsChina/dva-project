import * as service from '../../services/bas/pubBank';
import * as subService from '../../services/bas/pubBankSub';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'pubBankManage';
const objectId = 'bankCode';
const enterPath = '/bas/basDataManage/pubBankManage';
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
const subTableLoadOpt = {
  type: 'updateState',
  payload: { subTableSelects: [], subTableLoading: true },
};
const subTableLoadFinOpt = {
  type: 'updateState',
  payload: { subTableLoading: false },
};


export default {
  namespace,
  state: {
    // advExpand: false,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    tableSelects: [],
    addModalVisible: false,
    addFormSubmit: false,
    addFormData: {},
    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    subTableParam: { currentPage: 1 },
    subTableLoading: false,
    subTableList: [],
    subTableTotal: 0,
    subTableCurrentPage: 1,
    subTableSelects: [],
    subAddModalVisible: false,
    subAddFormSubmit: false,
    subAddFormData: {},
    subUpdateModalVisible: false,
    subUpdateFormSubmit: false,
    subUpdateFormData: {},
    subInfoModalVisible: false,
    subInfoTableData: {},
    selectBankCode: '',
    selectBankName: '',
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
    * updateOne({ payload }, { call, put, select }) {
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
        const tableParam = yield select(state => state[namespace].tableParam);
        yield put({
          type: 'updateState',
          payload: { tableSelects: [], tableLoading: true },
        });
        const res = yield call(service.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total, tableCurrentPage: tableParam.currentPage },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { addFormSubmit: true },
      });
      const res = yield call(service.addOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { addModalVisible: false, addFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        const tableParam = yield select(state => state[namespace].tableParam);
        yield put({
          type: 'updateState',
          payload: { tableSelects: [], tableLoading: true },
        });
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
        yield put({
          type: 'updateState',
          payload: { addFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
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

    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
    * subQueryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, subTableSelects: [], subTableLoading: true, selectBankCode: payload.subTableParam.selectBankCode, selectBankName: payload.subTableParam.selectBankName },
      });
      const res = yield call(subService.queryList, { ...payload.subTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { subTableList: detail.rspList, subTableTotal: detail.total, subTableCurrentPage: payload.subTableParam.currentPage },
        });
      }
      yield put(subTableLoadFinOpt);
    },
    * subUpdateOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { subUpdateFormSubmit: true },
      });
      const res = yield call(subService.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'subUpdateSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        const tableParam = yield select(state => state[namespace].subTableParam);
        yield put({
          type: 'updateState',
          payload: { subTableSelects: [], subTableLoading: true },
        });
        const res = yield call(subService.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { subTableList: result.rspList, subTableTotal: result.total, subTableCurrentPage: tableParam.currentPage },
          });
        }
        yield put(subTableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { subUpdateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * subAddOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { subAddFormSubmit: true },
      });
      const res = yield call(subService.addOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { subAddModalVisible: false, subAddFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        const tableParam = yield select(state => state[namespace].subTableParam);
        yield put({
          type: 'updateState',
          payload: { subTableSelects: [], subTableLoading: true },
        });
        const res = yield call(subService.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { subTableList: result.rspList, subTableTotal: result.total },
          });
        }
        yield put(subTableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { subAddFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * subDeleteList({ payload }, { call, put, select }) {
      yield put(subTableLoadOpt);
      const res = yield call(subService.deleteList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        const tableParam = yield select(state => state[namespace].subTableParam);
        yield put(subTableLoadOpt);
        const res = yield call(subService.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { subTableList: result.rspList, subTableTotal: result.total },
          });
        }
        yield put(subTableLoadFinOpt);
      } else {
        yield put(subTableLoadFinOpt);
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
      const addData = {};
      switch (type) {
        case 'add':
          newState = { ...state, addModalVisible: !state.addModalVisible };
          break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'subAdd':
          addData.bankParentCode = state.selectBankCode;
          addData.bankName = state.selectBankName;
          newState = { ...state, subAddFormData: addData, subAddModalVisible: !state.subAddModalVisible };
          break;
        case 'subUpdate':
          newState = { ...state, subUpdateFormData: action.payload.data, subUpdateModalVisible: !state.subUpdateModalVisible };
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
    subUpdateSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, subTableList: newTableList, subUpdateFormSubmit: false, subUpdateModalVisible: false };
    },
  },
};
