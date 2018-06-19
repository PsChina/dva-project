import * as service from '../../services/pms/routerMerchantScancode';
import * as modService from '../../services/pms/routerModScancode';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'routerScancodeModManage';
const objectId = 'modNo';
const enterPath = '/pms/routerManage/routerScancodeModManage';
// 基础公共信息
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('pms/routerMod');
const modValidMap = i18n.bizMap('pms/routerModValid')
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};
const routerTableLoadOpt = {
  type: 'updateState',
  payload: { routerTableLoading: true },
};
const routerTableLoadFinOpt = {
  type: 'updateState',
  payload: { routerTableLoading: false },
};

export default {
  namespace,
  state: {
    // 模版查询面板的状态
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    tableSelects: [],
    modAddModalVisible: false,
    modAddFormSubmit: false,
    modAddFormData: {},
    modUpdateModalVisible: false,
    modUpdateFormSubmit: false,
    modUpdateFormData: {},

    // 商户渠道查询面板的状态
    routerPayloadModInfo: {},
    routerPayloadCurrency: { currency: 'TWD' },
    routerTableParam: { currentPage: 1 },
    routerTableLoading: false,
    routerTableList: [],
    routerTableTotal: 0,
    routerTableCurrentPage: 1,
    routerTableSelects: [],
    routerAddModalVisible: false,

    // 渠道商户新增面板状态
    addModalTableList: [],
    addModalTableTotal: 0,
    addModalTableCurrentPage: 1,
    addModalTableParam: { currentPage: 1 },
    addModalTableLoading: false,
    addModalTableRowSelects: [],
    checkModNoChkMsg: '',

    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryModList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },
  effects: {
    * queryModList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableSelects: [], tableLoading: true },
      });
      const res = yield call(modService.queryModList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },
    * addOneMod({ payload }, { call, put }) {
      const res = yield call(modService.addOneMod, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { modAddModalVisible: false, modAddFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // const tableParam = yield select(state => state[namespace].routerTableParam);
        yield put({
          type: 'updateState',
          payload: { tableParam: [], tableLoading: true },
        });
        const res = yield call(modService.queryModList, { currentPage: 1 });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total, tableLoading: false },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { addFormSubmit: false, tableLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateOneMod({ payload }, { call, put }) {
      const res = yield call(modService.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { modUpdateModalVisible: false, modUpdateFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // const tableParam = yield select(state => state[namespace].routerTableParam);
        yield put({
          type: 'updateState',
          payload: { tableParam: [], tableLoading: true },
        });
        const res = yield call(modService.queryModList, { currentPage: 1 });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total, tableLoading: false },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false, tableLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryModRoutersList({ payload }, { call, put }) {
      // routerPayloadModInfo：当前模版信息
      yield put({
        type: 'updateState',
        payload: { ...payload, routerTableSelects: [], routerTableLoading: true, routerPayloadModInfo: payload.data },
      });
      const res = yield call(modService.queryModRoutersList, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { routerTableList: detail.rspList, routerTableTotal: detail.total, routerTableLoading: false, routerTableCurrentPage: payload.routerTableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },
    * queryAllMersList({ payload }, { call, put }) {
      if (payload.data.modNo === null || payload.data.modNo === undefined) {
        callNotice(commonMap.warning, bizMap.nullModNoMsg || commonMap.failInfo, 'warning');
      } else {
        if (payload.visibleType !== 1) {
          yield put({
            type: 'toggleModal',
            payload: { type: 'add' },
          });
        }
        yield put({
          type: 'updateState',
          payload: { ...payload, addModalTableSelects: [], addModalTableLoading: true },
        });
        // 判断交易渠道： 支付宝 1011  or  微信 1012
        let res;
        if (payload.data.txnChannel === '1011') {
          res = yield call(service.queryModAlipayAllList, payload.data);
        } else if (payload.data.txnChannel === '1012') {
          res = yield call(service.queryModWechatAllList, payload.data);
        } else if (payload.data.txnChannel === '1014') {
          res = yield call(service.queryModGamaPayAllList, payload.data);
        }
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { addModalTableList: detail.rspList, addModalTableTotal: detail.total, addModalTableLoading: false, addModalTableCurrentPage: payload.addModalTableParam.currentPage },
          });
        }
        yield put(routerTableLoadFinOpt);
      }
    },
    * setDefualt({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, routerUpdateFormSubmit: true },
      });
      const res = yield call(modService.setDefualt, { ...payload.data });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        yield put(routerTableLoadOpt);
        const param = {};
        param.modNo = payload.data.modNo;
        param.currency = payload.data.currency;
        param.txnChannel = payload.data.txnChannel;
        const res = yield call(modService.queryModRoutersList, param);
        const result = parseResponse(res);
        yield put(routerTableLoadFinOpt);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: result.rspList, routerTableTotal: result.total, routerTableCurrentPage: 1 },
          });
        }
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * deleteOneRouter({ payload }, { call, put }) {
      yield put(routerTableLoadOpt);
      const res = yield call(modService.deleteOneMer, payload.data);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put(routerTableLoadOpt);
        const param = {};
        param.currency = payload.data.currency;
        param.modNo = payload.data.modNo;
        param.txnChannel = payload.data.txnChannel;
        const res = yield call(modService.queryModRoutersList, param);
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: result.rspList, routerTableTotal: result.total, routerTableCurrentPage: 1 },
          });
        }
        yield put(routerTableLoadFinOpt);
      } else {
        yield put(routerTableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * addOneModMer({ payload }, { call, put }) {
      const res = yield call(modService.addOneModMer, payload.data);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { routerAddModalVisible: false, routerAddFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // const tableParam = yield select(state => state[namespace].routerTableParam);
        yield put({
          type: 'updateState',
          payload: { routerTableParam: [], routerTableLoading: true },
        });
        const param = {};
        param.currency = payload.data.currency;
        param.modNo = payload.data.modNo;
        param.txnChannel = payload.data.txnChannel;
        const res = yield call(modService.queryModRoutersList, param);
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { routerTableList: result.rspList, routerTableTotal: result.total, routerTableLoading: false, routerTableCurrentPage: 1 },
          });
        }
        yield put(routerTableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { routerAddFormSubmit: false, routerTableLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    // modId reapeat check
    * checkModNo({ payload }, { call, put }) {
      const res = yield call(modService.checkModNo, { modNo: payload.modNo });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { modAddFormData: payload },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { checkModNoChkMsg: modValidMap.validModNoRepeat, modAddFormData: payload },
        });
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
        case 'add':
          newState = { ...state, routerAddModalVisible: !state.routerAddModalVisible };
          break;
        case 'modAdd':
          newState = { ...state, modAddModalVisible: !state.modAddModalVisible };
          break;
        case 'modUpdate':
          newState = { ...state, modUpdateFormData: action.payload.data, modUpdateModalVisible: !state.modUpdateModalVisible };
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
