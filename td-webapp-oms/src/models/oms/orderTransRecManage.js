import * as service from '../../services/oms/orderTransRec';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'orderTransRecManage';
const objectId = 'txnNo';
const enterPath = '/oms/orderManage/orderTransRecManage';
const commonMap = i18n.commonMap();
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};
const tableLoadOpt = {
  type: 'updateState',
  payload: { tableSelects: [], tableLoading: true },
};
export default {
  namespace,
  state: {
    tableCurrentPage: 1,
    advExpand: false,
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
    orderFormData: {},
    orderModalVisible: false,
    handleModalVisible: false,
    filePath: '',
    fileList: [],
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
    * queryOne({ payload }, { call, put }) {
      const res = yield call(service.queryOne, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'toggleModal',
          payload: { type: 'info', data: detail.rspData },
        });
      }
      yield put(tableLoadFinOpt);
    },
    * handleTransferOrder({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.handleSrcTrans, { ...payload });
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
    * queryOrderDetail({ payload }, { call, put }) {
      const res = yield call(service.queryOrderDetail, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'toggleModal',
          payload: { type: 'queryOrderDetail', data: detail.rspData },
        });
      } else {
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * changeFileData({ payload }, { put }) {
      const formData = payload.formData;
      yield put({
        type: 'updateState',
        payload: { filePath: payload.data.filePath, fileList: payload.data.fileList, infoTableData: formData },
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
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'queryOrderDetail':
          newState = { ...state, orderFormData: action.payload.data, orderModalVisible: !state.orderModalVisible };
          break;
        case 'handle':
          newState = { ...state, infoTableData: action.payload.data, handleModalVisible: !state.handleModalVisible };
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
      return { ...state, tableList: newTableList, updateFormSubmit: false, handleModalVisible: false };
    },
    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */

  },
};
