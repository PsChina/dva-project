import * as service from '../../services/pms/channelScancode';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'channelScancodeManage';
const objectId = 'chnId';
const enterPath = '/pms/channelManage/channelScancodeManage';
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
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    tableSelects: [],

    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},

    infoModalVisible: false,
    infoTableData: {},
    fileList: [],
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
    // query channel list
    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableSelects: [], tableLoading: true, tableCurrentPage: payload.tableParam.currentPage },
      });
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total },
        });
      }
      yield put(tableLoadFinOpt);
    },

    // update channel info
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

    // delete disabled channel list
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
    // 上传logo
    * uploadLogo({ payload }, { call, put }){
    const res1 = yield call(service.uploadLogo, {...payload});
    const result = parseResponse(res1);
    const res2 = yield call(service.getLogoBase64, {
      PKID: result.FJID_PIC_1,
      TABLENAME: 'chn_scan_inf',
      attachInfoModalVisible: true,
    });
    const result2 = parseResponse(res2);
    const fileList = [{
      uid:`${result.FJID_PIC_1}`,
      name:`${result.FJNAME_PIC_1}`,
      status:'done',
      url:`data:image/png;base64,${result2.rspData.FJSRCS_PIC_1}`,
    }]
    yield put({
      type: 'updateState',
      payload: { fileList, },
    });
  },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    // change limit switch state
    toggleAdvExpand(state, action) {
      return { ...state, advExpand: !state.advExpand, updateFormData: action.payload.dat };
    },
    // control modal state
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

    // flush table
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
    // flush table
    updateStatusSuccess(state, action) {
      const ids = action.payload.ids;
      const status = action.payload.chnStatus;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, chnStatus: status };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },
  },
};
