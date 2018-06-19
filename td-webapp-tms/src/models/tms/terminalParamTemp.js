import * as service from '../../services/tms/terminalParamTemp';
import * as paramService from '../../services/tms/terminalParam';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'terminalParamTemp';
const objectId = 'tempId';
const enterPath = '/tms/terminalManage/terminalParamTemp';
// 基础公共信息
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('tms/terminalParamTemp');
const params = i18n.bizMap('tms/terminalParams');
const tableLoadOpt = {
  type: 'updateState',
  payload: { tableLoading: true },
};
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};

export default {
  namespace,
  state: {
    tableCurrentPage: 1,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    addSubmiting: false,
    addModalVisible: false,
    deleteId: '',

    paramTemp: null,
    paramItems: [],
    paramTableList: [],
    paramTableLoading: false,
    deleteParamId: '',
    deleteParamIdx: -1,
    deleteParamTempId: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryParamItems', payload: {} });
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },
  effects: {
    * queryList({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage, tableParam: payload.tableParam },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put(tableLoadFinOpt);
    },
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { addSubmiting: true },
      });
      const res = yield call(service.addOne, { ...payload.dat });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put({
          type: 'updateState',
          payload: { addSubmiting: false, addModalVisible: false },
        });
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
        yield put({
          type: 'updateState',
          payload: { addSubmiting: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * deleteOne({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(service.deleteOne, { id: payload.id });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        const tableParam = yield select(state => state[namespace].tableParam);
        const res = yield call(service.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put(tableLoadFinOpt);
    },

    * queryParamItems({ payload }, { put }) {
      const arr = [];
      for (const k in params) {
        arr.push({ value: k, text: params[k] });
      }
      yield put({
        type: 'updateState',
        payload: { paramItems: arr },
      });
    },
    * queryParamList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: true, paramTemp: payload.record },
      });
      const res = yield call(paramService.queryList, { tempId: payload.record[objectId] });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { paramTableList: detail.rspList },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: false },
      });
    },
    * addParam({ payload }, { select, call, put }) {
      const list = yield select(state => state[namespace].paramTableList);
      const param = payload.dat;
      param.itemCode = param.paramItem;
      param.itemName = params[param.paramItem];
      for (let i = 0; i < list.length; i++) {
        if (list[i].itemCode === param.itemCode) {
          callNotice(commonMap.warning, bizMap.itemDuplicateAdd, 'warning');
          return;
        }
      }
      const maxOrder = list.length === 0 ? 0 : parseInt(list[list.length - 1].itemOrder, 0);
      param.itemOrder = maxOrder + 1;

      yield put({
        type: 'updateState',
        payload: { paramTableLoading: true },
      });
      const res = yield call(paramService.addOne, { ...param });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        list.push(param)
        yield put({
          type: 'updateState',
          payload: { paramTableList: list },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: false },
      });
    },
    * deleteParam({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: true },
      });
      const res = yield call(paramService.deleteOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'removeParamList',
          payload: {},
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: false },
      });
    },
    * upParam({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: true },
      });
      const res = yield call(paramService.upOne, { id: payload.id, tempId: payload.tempId });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'moveUpParam',
          payload: { idx: payload.idx },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: false },
      });
    },
    * downParam({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: true },
      });
      const res = yield call(paramService.downOne, { id: payload.id, tempId: payload.tempId });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'moveUpParam',
          payload: { idx: payload.idx + 1 },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({
        type: 'updateState',
        payload: { paramTableLoading: false },
      });
    },
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
        default:
          break;
      }
      return newState;
    },
    removeParamList(state) {
      const idx = state.deleteParamIdx;
      const list = state.paramTableList;
      list.splice(idx, 1);
      return { ...state, paramTableList: list }
    },
    moveUpParam(state, action) {
      const idx = action.payload.idx;
      const list = state.paramTableList;
      const item1 = list[idx];
      const ord1 = item1.itemOrder;
      const item2 = list[idx - 1];
      const ord2 = item2.itemOrder;
      const newList = list.concat();
      item1.itemOrder = ord2;
      item2.itemOrder = ord1;
      newList[idx] = item2;
      newList[idx - 1] = item1;
      return { ...state, paramTableList: newList }
    },
  },
};
