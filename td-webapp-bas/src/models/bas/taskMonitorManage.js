import * as service from '../../services/bas/taskMonitor';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'taskMonitorManage';
const objectId = 'flowbusinesstoken';
const enterPath = '/bas/workflow/taskMonitorManage';
const commonMap = i18n.commonMap();
// 基础公共信息
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
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
    viewModalVisible: false,
    taskCfgList: [],
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1, systemno: '000' } } });
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
    * queryOneProcess({ payload }, { call, put }) {
      const res = yield call(service.queryOne, { ...payload.data });
      console.log('res', res)
      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { ...payload, taskCfgList: detail.rspList },
      });
      if (detail.rspCod === '200') {
        console.log('detail=>', detail)
        yield put({
          type: 'toggleModal',
          payload: { type: 'view', data: detail },
        })
      } else {
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
        case 'view':
          newState = { ...state, infoTableData: action.payload.data, viewModalVisible: !state.viewModalVisible };
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
