import * as service from '../../services/pms/merchantBankcard';
import * as termService from '../../services/pms/terminalBankcard';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const namespace = 'merchantBankcardManage';
const enterPath = '/pms/merchantManage/merchantBankcardManage';
const commonMap = i18n.commonMap();
const objectId1 = 'chnMerNo';
const objectId2 = 'chnId';

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
    tableSelects: [],
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,

    infoTableData: {},
    infoModalVisible: false,

    updateBasicFormData: {},
    updateBasicModalVisible: false,
    updateBasicFormSubmit: false,

    termModalVisible: false,
    termTableParam: { currentPage: 1 },
    termTableLoading: false,
    termTableList: [],
    termTableTotal: 0,
    termTableCurrentPage: 1,

    advExpand: false,

    authUpdFormData: {},
    authUpdModalVisible: false,
    authUpdFormSubmit: false,

    chnId: '',
    chnMerNo: '',
    txnChannelSupportList: [],
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

    // update merchant basic info
    * updateOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateBasicFormSubmit: true },
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
          payload: { updateBasicFormSubmit: false },
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

    // query terminal list
    * queryTermList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, termTableLoading: true },
      });
      const res = yield call(termService.queryList, { ...payload.termTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { termTableList: detail.rspList, termTableTotal: detail.total, termModalVisible: true, termTableParam: payload, termTableCurrentPage: payload.termTableParam.currentPage },
        });
      }
      yield put({
        type: 'updateState',
        payload: { termTableLoading: false },
      });
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

    // 银行卡权限内部开关修改
    // change auth data
    * changeAuthData({ payload }, { put }) {
      const authData = payload.data.authData;
      const formData = authData.data;
      // console.log('authData==', authData);
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
        payload: { authUpdFormData: formData },
      });
    },

    // update auth info
    * updAuthInfo({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { authUpdFormSubmit: true },
      });
      const res = yield call(service.updateAuth, { ...payload });
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
          payload: { authUpdFormSubmit: false, authUpdModalVisible: false },
        });
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
          newState = { ...state, addModalVisible: !state.addModalVisible };
          break;
        case 'update':
          newState = { ...state, updateBasicFormData: action.payload.data, updateBasicModalVisible: !state.updateBasicModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
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
      return { ...state, tableList: newTableList, updateBasicFormSubmit: false, updateBasicModalVisible: false, authUpdFormSubmit: false, authUpdModalVisible: false };
    },

    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */
    // flush page table
    updateStatusSuccess(state, action) {
      // console.log('action', action.payload);
      const chnMerNos = action.payload.chnMerNos;
      const chnIds = action.payload.chnIds;
      const chnMerStatus = action.payload.chnMerStatus;
      const newTableList = state.tableList.map((item) => {
        if (chnMerNos.indexOf(item[objectId1]) !== -1 && chnIds.indexOf(item[objectId2]) !== -1) {
          return { ...item, chnMerStatus: chnMerStatus };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },

    // toggle limit component
    toggleAdvExpand(state, action) {
      return { ...state, advExpand: !state.advExpand, updateBasicFormData: action.payload.dat };
    },

    // toggle auth modal
    toggleAuthExpand(state, action) {
      let newState = state;
      const formData = {};
      const fPospayTxnSup = action.payload.fPospayTxnSup;
      const pospayTxnSup = action.payload.pospayTxnSup;
      const chnId = action.payload.chnId;
      const chnMerNo = action.payload.chnMerNo;
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

      newState = { ...state, authUpdModalVisible: !state.authUpdModalVisible, authUpdFormData: formData, chnId: chnId, chnMerNo: chnMerNo };
      return newState;
    },
  },
};
