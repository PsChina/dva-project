import * as service from '../../services/pms/terminalBankcard';
import * as chnService from '../../services/pms/channelBankcard';
import * as merService from '../../services/pms/merchantBankcard';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'terminalBankcardManage';
const enterPath = '/pms/terminalManage/terminalBankcardManage';
// 基础公共信息
const commonMap = i18n.commonMap();
const objectId1 = 'chnTermNo';
const objectId2 = 'chnMerNo';
const objectId3 = 'chnId';

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
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableSelects: [],
    tableCurrentPage: 1,

    infoTableData: {},
    infoModalVisible: false,

    updateModalVisible: false,
    updateFormData: {},
    updateFormSubmit: false,

    addModalVisible: false,
    addFormSubmit: false,
    chnList: [],
    uuid: 0,
    keys: [0],
    data: {},

    chnMerNoList: [],
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
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
    // query terminal list
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

    // update key
    * updateKey({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateKey, { ...payload });
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

    // delete disabled terminal list
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

    // add terminals
    * addList({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { addFormSubmit: true, formData: payload.formData },
      });
      const formData = yield select(state => state[namespace].formData);
      const submitData = { ...formData };
      const res = yield call(service.addList, { ...submitData });
      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { addFormSubmit: false },
      });
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put({
          type: 'updateState',
          payload: { data: {}, uuid: 0, chnList: [], keys: [0], addModalVisible: false },
        });
        yield put({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
        // obj.props.form.resetFields();
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
    // enable or disable
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

    // query channel list
    * queryChnList({ payload }, { call, put }) {
      const res = yield call(chnService.querySelect, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnList: detail.rspList, addModalVisible: true },
        });
      }
    },

    // 查询渠道商终信息
    // query merchant info
    * queryChnMerInf({ payload }, { call, put }) {
      const res = yield call(merService.querySelect, { ...payload });
      const detail = parseResponse(res);
      // const result = {};
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnMerNoList: detail.rspList, data: { ...payload } },
        });
      }
    },

  },
  reducers: {
    // update simple state
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    // flush page table
    updateSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId1] === newItem[objectId1] && item[objectId2] === item[objectId2] && item[objectId3] === item[objectId3]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateModalVisible: false };
    },

    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */
    // flush table
    updateStatusSuccess(state, action) {
      const chnTermNos = action.payload.chnTermNos;
      const chnMerNos = action.payload.chnMerNos;
      const chnIds = action.payload.chnIds;
      const termStatus = action.payload.termStatus;
      const newTableList = state.tableList.map((item) => {
        if (chnTermNos.indexOf(item[objectId1]) !== -1 && chnMerNos.indexOf(item[objectId2]) !== -1 && chnIds.indexOf(item[objectId3]) !== -1) {
          return { ...item, termStatus: termStatus };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },

    // toggle simple modal
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'add':
          newState = { ...state, addModalVisible: !state.addModalVisible, data: {}, uuid: 0, chnList: [], keys: [0] };
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

  },
};
