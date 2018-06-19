import * as service from '../../services/agtp/terminal';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'terminalManage';
const objectId = 'terId';
const enterPath = '/agtp/terminalManage/TerminalManage';
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
    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    updateAuthModalVisible: false,
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
            payload: { tableList: result.rspList, tableTotal: result.total, tableCurrentPage: tableParam.currentPage },
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
    // 查询终端权限信息
    * queryAuthDetail({ payload }, { put }) {
      const formData = {};
      formData.bankCardSup = payload.data.bankCardSup;
      formData.terId = payload.data.terId;
      const fPospayTxnSup = '111111111111111';
      const pospayTxnSup = payload.data.pospayTxnSup;
      formData.fYecxStatus = fPospayTxnSup.substring(0, 1) === '1';
      formData.fXfStatus = fPospayTxnSup.substring(1, 2) === '1';
      formData.fXfczStatus = fPospayTxnSup.substring(2, 3) === '1';
      formData.fCxStatus = fPospayTxnSup.substring(3, 4) === '1';
      formData.fCxczStatus = fPospayTxnSup.substring(4, 5) === '1';
      formData.fThStatus = fPospayTxnSup.substring(5, 6) === '1';
      formData.fYsqStatus = fPospayTxnSup.substring(6, 7) === '1';
      formData.fYsqczStatus = fPospayTxnSup.substring(7, 8) === '1';
      formData.fYsqcxStatus = fPospayTxnSup.substring(8, 9) === '1';
      formData.fYsqcxczStatus = fPospayTxnSup.substring(9, 10) === '1';
      formData.fYsqwcStatus = fPospayTxnSup.substring(10, 11) === '1';
      formData.fYsqwcczStatus = fPospayTxnSup.substring(11, 12) === '1';
      formData.fYsqwccxStatus = fPospayTxnSup.substring(12, 13) === '1';
      formData.fYsqwccxczStatus = fPospayTxnSup.substring(13, 14) === '1';
      // 本级银行卡交易类
      formData.yecxStatus = fPospayTxnSup.substring(0, 1) === '1' && pospayTxnSup.substring(0, 1) === '1';
      formData.xfStatus = fPospayTxnSup.substring(1, 2) === '1' && pospayTxnSup.substring(1, 2) === '1';
      formData.xfczStatus = fPospayTxnSup.substring(2, 3) === '1' && pospayTxnSup.substring(2, 3) === '1';
      formData.cxStatus = fPospayTxnSup.substring(3, 4) === '1' && pospayTxnSup.substring(3, 4) === '1';
      formData.cxczStatus = fPospayTxnSup.substring(4, 5) === '1' && pospayTxnSup.substring(4, 5) === '1';
      formData.thStatus = fPospayTxnSup.substring(5, 6) === '1' && pospayTxnSup.substring(5, 6) === '1';
      formData.ysqStatus = fPospayTxnSup.substring(6, 7) === '1' && pospayTxnSup.substring(6, 7) === '1';
      formData.ysqczStatus = fPospayTxnSup.substring(7, 8) === '1' && pospayTxnSup.substring(7, 8) === '1';
      formData.ysqcxStatus = fPospayTxnSup.substring(8, 9) === '1' && pospayTxnSup.substring(8, 9) === '1';
      formData.ysqcxczStatus = fPospayTxnSup.substring(9, 10) === '1' && pospayTxnSup.substring(9, 10) === '1';
      formData.ysqwcStatus = fPospayTxnSup.substring(10, 11) === '1' && pospayTxnSup.substring(10, 11) === '1';
      formData.ysqwcczStatus = fPospayTxnSup.substring(11, 12) === '1' && pospayTxnSup.substring(11, 12) === '1';
      formData.ysqwccxStatus = fPospayTxnSup.substring(12, 13) === '1' && pospayTxnSup.substring(12, 13) === '1';
      formData.ysqwccxczStatus = fPospayTxnSup.substring(13, 14) === '1' && pospayTxnSup.substring(13, 14) === '1';
      yield put({
        type: 'toggleModal',
        payload: { type: 'updateAuth', data: formData },
      });
    },
    // 修改权限信息提交
    * updateAuth({ payload }, { call, put }) {
      const res = yield call(service.updateAuth, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateAuthSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    // 银行卡权限内部开关修改
    * changeAuthData({ payload }, { put }) {
      const authData = payload.data.authData;
      const formData = authData.data;
      console.log('authData==', authData);
      if (authData.yecxStatus !== undefined) {
        formData.yecxStatus = !formData.yecxStatus;
      }
      if (authData.xfStatus !== undefined) {
        formData.xfStatus = !formData.xfStatus;
        if (!authData.xfStatus) {
          formData.xfczStatus = false;
        }
      }
      if (authData.xfczStatus !== undefined) {
        formData.xfczStatus = !formData.xfczStatus;
      }
      if (authData.cxStatus !== undefined) {
        formData.cxStatus = !formData.cxStatus;
        if (!authData.cxStatus) {
          formData.cxczStatus = false;
        }
      }
      if (authData.cxczStatus !== undefined) {
        formData.cxczStatus = !formData.cxczStatus;
      }
      if (authData.thStatus !== undefined) {
        formData.thStatus = !formData.thStatus;
      }
      if (authData.ysqStatus !== undefined) {
        formData.ysqStatus = !formData.ysqStatus;
        if (!authData.ysqStatus) {
          formData.cxczStatus = false;
          formData.ysqczStatus = false;
          formData.ysqcxStatus = false
          formData.ysqcxczStatus = false
          formData.ysqwcStatus = false
          formData.ysqwcczStatus = false
          formData.ysqwccxStatus = false
          formData.ysqwccxczStatus = false
        }
      }
      if (authData.ysqczStatus !== undefined) {
        formData.ysqczStatus = !formData.ysqczStatus;
      }
      if (authData.ysqcxStatus !== undefined) {
        formData.ysqcxStatus = !formData.ysqcxStatus;
        if (!authData.ysqcxStatus) {
          formData.ysqcxczStatus = false;
        }
      }
      if (authData.ysqcxczStatus !== undefined) {
        formData.ysqcxczStatus = !formData.ysqcxczStatus;
      }
      if (authData.ysqwcStatus !== undefined) {
        formData.ysqwcStatus = !formData.ysqwcStatus;
        if (!authData.ysqwcStatus) {
          formData.ysqwcczStatus = false;
        }
      }
      if (authData.ysqwcczStatus !== undefined) {
        formData.ysqwcczStatus = !formData.ysqwcczStatus;
      }
      if (authData.ysqwccxStatus !== undefined) {
        formData.ysqwccxStatus = !formData.ysqwccxStatus;
        if (!authData.ysqwccxStatus) {
          formData.ysqwccxczStatus = false;
        }
      }
      if (authData.ysqwccxczStatus !== undefined) {
        formData.ysqwccxczStatus = !formData.ysqwccxczStatus;
      }
      yield put({
        type: 'updateState',
        payload: { updateFormData: formData },
      });
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
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
        case 'updateAuth':
          newState = { ...state, updateFormData: action.payload.data, updateAuthModalVisible: !state.updateAuthModalVisible };
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
      const terStatue = action.payload.terStatue;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, terStatue: terStatue };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },
    updateAuthSuccess(state, action) {
      const newItem = action.payload;
      console.log('newItem===', newItem);
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList, updateFormSubmit: false, updateAuthModalVisible: false };
    },
  },
};
