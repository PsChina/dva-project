import * as service from '../../services/tms/terminalMer';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'terminalMerManage';
const objectId = 'braId';
const enterPath = '/tms/terminalBindManage/terminalMerManage';
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

const termTableLoadOpt = {
  type: 'updateState',
  payload: { termTableSelects: [], termTableLoading: true },
};
const termTableLoadFinOpt = {
  type: 'updateState',
  payload: { termTableLoading: false },
};

const addModalTableLoadFinOpt = {
  type: 'updateState',
  payload: { addModalTableLoading: false, addModalTableRowSelects: '' },
};

export default {
  namespace,
  state: {
    // advExpand: false,
    tableCurrentPage: 1,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableSelects: [],
    addModalVisible: false,
    addFormSubmit: false,
    addFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
     // 终端详情面板状态
    termPayLoadBraId: {},
    termTableParam: { currentPage: 1 },
    termTableLoading: false,
    termTableList: [],
    termTableTotal: 0,
    termTableCurrentPage: 1,
    termTableSelects: [],

     // 绑定新增面板状态
    addModalPayLoadBraId: {},
    addModalTableList: [],
    addModalTableTotal: 0,
    addModalTableCurrentPage: 1,
    addModalTableParam: { currentPage: 1 },
    addModalTableLoading: false,
    addModalTableRowSelects: [],

    // table选中
    addModalTableSelects: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1, merCate: '1' } } });
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
    * queryTermList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, termTableSelects: [], termTableLoading: true, termPayLoadBraId: payload.data },
      });
      const res = yield call(service.queryTermList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { termTableList: detail.rspList, termTableTotal: detail.total, termTableCurrentPage: payload.termTableParam.currentPage },
        });
      }
      yield put(termTableLoadFinOpt);
    },
    * queryUnBindTermList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, addModalTableSelects: [], addModalTableLoading: true, addModalVisible: true, addModalPayLoadBraId: payload.data },
      });
      const res = yield call(service.queryUnBindTermList, { ...payload });
      const detail = parseResponse(res);
      // debug
      for( let key in detail['rspList'] ){
        let value = detail['rspList'][key];
        if(!value){
          detail['rspList'][key] = {};
        }
      }
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { addModalTableList: detail.rspList, addModalTableTotal: detail.total, addModalTableCurrentPage: payload.addModalTableParam.currentPage },
        });
      }
      yield put(addModalTableLoadFinOpt);
    },
    * queryOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryOne, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { infoTableData: detail.rspData, infoModalVisible: true },
        });
      }
    },
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
    * addOne({ payload }, { call, put }) {
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
        yield put({
          type: 'updateState',
          payload: { termTableSelects: [], termTableLoading: true, termPayLoadBraId: payload.data },
        });
        const res = yield call(service.queryTermList, { ...payload });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { termTableList: result.rspList, termTableTotal: result.total, termTableCurrentPage: payload.termTableParam.currentPage },
          });
        }
        yield put(termTableLoadFinOpt);
      } else {
        yield put(addModalTableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * addBatch({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { submiting: true },
      });
      let res = null;
      res = yield call(service.addBatch, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { addModalVisible: false, addFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put({
          type: 'updateState',
          payload: { termTableSelects: [], termTableLoading: true, termPayLoadBraId: payload.data },
        });
        const res = yield call(service.queryTermList, { ...payload });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { termTableList: result.rspList, termTableTotal: result.total, termTableCurrentPage: payload.termTableParam.currentPage },
          });
        }
        yield put(termTableLoadFinOpt);
      } else {
        yield put(addModalTableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * deleteList({ payload }, { call, put }) {
      yield put(termTableLoadOpt);
      const res = yield call(service.deleteList, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        yield put(termTableLoadOpt);
        const res = yield call(service.queryTermList, { ...payload });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { termTableList: result.rspList, termTableTotal: result.total },
          });
        }
        yield put(termTableLoadFinOpt);
      } else {
        yield put(termTableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
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
