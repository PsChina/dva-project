import * as service from '../../services/tms/terminalFirmware';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'terminalFirmwareManage';
const objectId = 'verId';
const enterPath = '/tms/terminalManage/terminalFirmwareManage';
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
    uploadModalVisible: false,
    uploadFormSubmit: false,
    uploadFormData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    companyOptionsData: [],
    modelOptionsData: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryCompanyOptionData', payload: {} });
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
          payload: { addModalVisible: false, addFormSubmit: false, addFormData: {} },
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
    * upload({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { uploadFormSubmit: true },
      });
      const res = yield call(service.upload, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { uploadModalVisible: false, uploadFormSubmit: false },
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
    * queryCompanyOptionData({ payload }, { call, put }) {
      const res = yield call(service.querySelect, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { companyOptionsData: detail.rspList },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryModelOptionData({ payload }, { call, put }) {
      const res = yield call(service.queryModelSelect, { ...payload });
      const detail = parseResponse(res);
      const formData = payload.childFormData;
      formData.copId = payload.copId;
      formData.terModId = [];
      if (detail.rspCod === '200') {
        if (payload.optType === '01') {
          yield put({
            type: 'updateState',
            payload: { modelOptionsData: detail.rspList, addFormData: formData },
          });
        } else if (payload.optType === '02') {
          yield put({
            type: 'updateState',
            payload: { modelOptionsData: detail.rspList, updateFormData: formData },
          });
        }

      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateModel({ payload }, { call, put }) {
      const record = payload.data;
      const res = yield call(service.queryModelSelect, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { modelOptionsData: detail.rspList },
        });
        yield put({
          type: 'toggleModal',
          payload: { type: 'update', data: record },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * uploadModel({ payload }, { call, put }) {
      const record = payload.data;
      const res = yield call(service.queryModelSelect, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { modelOptionsData: detail.rspList },
        });
        yield put({
          type: 'toggleModal',
          payload: { type: 'upload', data: record },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * changeFileData({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: { filePath: payload.data },
      });
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
      const formData = action.payload.data;
      switch (type) {
        case 'add':
          newState = { ...state, addModalVisible: !state.addModalVisible };
          break;
        case 'update':
          if (formData.terModId) {
            if (typeof (formData.terModId) === 'string') {
              if (formData.terModId.length !== 0) {
                formData.terModId = formData.terModId.split(',');
              } else {
                formData.terModId = [];
              }
            }
          } else {
            formData.terModId = [];
          }
          newState = { ...state, updateFormData: formData, updateModalVisible: !state.updateModalVisible };
          break;
        case 'upload':
          if (formData.terModId) {
            if (typeof (formData.terModId) === 'string') {
              if (formData.terModId.length !== 0) {
                formData.terModId = formData.terModId.split(',');
              } else {
                formData.terModId = [];
              }
            }
          } else {
            formData.terModId = [];
          }
          newState = { ...state, uploadFormData: formData, uploadModalVisible: !state.uploadModalVisible };
          break;
        case 'info':
          if (formData.terModId) {
            if (typeof (formData.terModId) === 'string') {
              if (formData.terModId.length !== 0) {
                formData.terModId = formData.terModId.split(',');
              } else {
                formData.terModId = [];
              }
            }
          } else {
            formData.terModId = [];
          }
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
