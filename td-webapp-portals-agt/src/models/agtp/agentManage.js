import * as service from '../../services/agtp/agent';
import * as commonService from '../../services/agtp/common';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'agentManage';
const objectId = 'agtId';
const enterPath = '/agtp/agentManage/AgentManage';
// 基础公共信息
const commonMap = i18n.commonMap();
const validMap = i18n.bizMap('agentVaild');
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
    tableCurrentPage: 1,
    advExpand: false,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableSelects: [],
    // addModalVisible: false,
    // addFormSubmit: false,
    // addFormData: {},
    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    attachInfoData: {},
    attachInfoModalVisible: false,
    spinLoading: true,
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    tableRecord: {},
    updateBaseModalVisible: false,
    updateAttachModalVisible: false,
    updateAccModalVisible: false,
    bizSaleList: [],
    bankList: [],
    agtNameChkMsg: '',
    agtEmailChkMsg: '',
    agtMobileChkMsg: '',
    agtId: '',
    agtType: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryBanklist', payload: {} });
          dispatch({ type: 'queryBizSaleList', payload: {} });
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
    * queryAttach({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      const type = payload.agtType;
      const res = yield call(commonService.queryAttach, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { agtType: type, attachInfoData: detail.rspData, spinLoading: false },
        });
      }
    },
    // * addOne({ payload }, { call, put, select }) {
    //   yield put({
    //     type: 'updateState',
    //     payload: { addFormSubmit: true },
    //   });
    //   const res = yield call(service.addOne, { ...payload });
    //   const detail = parseResponse(res);
    //   if (detail.rspCod === '200') {
    //     yield put({
    //       type: 'updateState',
    //       payload: { addModalVisible: false, addFormSubmit: false },
    //     });
    //     callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
    //     const tableParam = yield select(state => state[namespace].tableParam);
    //     yield put({
    //       type: 'updateState',
    //       payload: { tableSelects: [], tableLoading: true },
    //     });
    //     const res = yield call(service.queryList, { ...tableParam });
    //     const result = parseResponse(res);
    //     if (result.rspCod === '200') {
    //       yield put({
    //         type: 'updateState',
    //         payload: { tableList: result.rspList, tableTotal: result.total },
    //       });
    //     }
    //     yield put(tableLoadFinOpt);
    //   } else {
    //     yield put({
    //       type: 'updateState',
    //       payload: { addFormSubmit: false },
    //     });
    //     callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
    //   }
    // },
    // * deleteList({ payload }, { call, put, select }) {
    //   yield put(tableLoadOpt);
    //   const res = yield call(service.deleteList, { ...payload });
    //   const detail = parseResponse(res);
    //   if (detail.rspCod === '200') {
    //     callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
    //     // 获取当前命名控件的查询条件 重新查询列表
    //     const tableParam = yield select(state => state[namespace].tableParam);
    //     yield put(tableLoadOpt);
    //     const res = yield call(service.queryList, { ...tableParam });
    //     const result = parseResponse(res);
    //     if (result.rspCod === '200') {
    //       yield put({
    //         type: 'updateState',
    //         payload: { tableList: result.rspList, tableTotal: result.total },
    //       });
    //     }
    //     yield put(tableLoadFinOpt);
    //   } else {
    //     yield put(tableLoadFinOpt);
    //     callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
    //   }
    // },
    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
    /**
     * 查询银行信息
     * @author xuxf 2017-03-20
     */
    * queryBanklist({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      const res = yield call(commonService.queryBanklist);
      const result = parseResponse(res);
      if (result.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { bankList: result.rspData },
        });
      }
    },
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
    * updateBase({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateBase, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateBaseSuccess',
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
    * updateAttach({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateAttachSuccess',
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
    * updateAcc({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updatAcc, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateAccSuccess',
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
    /**
     * 查询业务员信息
     * @author xuxf 2017-03-21
     */
    * queryBizSaleList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      const res = yield call(commonService.queryBizSaleList);
      const result = parseResponse(res);
      if (result.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { bizSaleList: result.rspList },
        });
      }
    },

    /**
     * 修改基本信息时查询代理商邮箱、手机号、名称是否有重复
     * @author xuxf 2017-04-07
     */
    * validProps({ payload }, { call, put }) {
      const res = yield call(service.queryList, { ...payload });
      const detail = parseResponse(res);
      const type = payload.type;
      const agtId = payload.agtId;
      const agtName = payload.agtName;
      const agtEmail = payload.agtEmail;
      const agtMobile = payload.agtMobile;
      if (detail.rspCod === '200' && detail.total > 0) {
        if (type === '1') {
          yield put({
            type: 'updateChkUniqueState',
            payload: { agtMobileChkMsg: validMap.vaildAgentMobile, agtId: agtId, agtMobile: agtMobile },
          });
        }
        if (type === '2') {
          yield put({
            type: 'updateChkUniqueState',
            payload: { agtEmailChkMsg: validMap.vaildAgentEmail, agtId: agtId, agtEmail: agtEmail },
          });
        }
        if (type === '3') {
          yield put({
            type: 'updateChkUniqueState',
            payload: { agtNameChkMsg: validMap.vaildAgentName, agtId: agtId, agtName: agtName },
          });
        }
      } else {
        yield put({
          type: 'updateChkUniqueState',
          payload,
        });
      }
    },

    * agtLogo({ payload }, { call, put }) {
      const res = yield call(service.agtLogo, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { type: 'info', data: detail.rspData },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
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
        // case 'add':
        //   newState = { ...state, addModalVisible: !state.addModalVisible };
        //   break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'attachInfo':
          newState = { ...state, attachInfoData: action.payload.data, attachInfoModalVisible: !state.attachInfoModalVisible };
          break;
        case 'updateBase':
          newState = { ...state, updateFormData: action.payload.data, updateBaseModalVisible: !state.updateBaseModalVisible };
          break;
        case 'updateAttach':
          newState = { ...state, updateFormData: action.payload.data, updateAttachModalVisible: !state.updateAttachModalVisible };
          break;
        case 'updateAcc':
          newState = { ...state, updateFormData: action.payload.data, updateAccModalVisible: !state.updateAccModalVisible };
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
      const status = action.payload.agtStatus;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, agtStatus: status };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },
    updateBaseSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateBaseModalVisible: false };
    },
    updateAttachSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateAttachModalVisible: false };
    },
    updateAccSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateAccModalVisible: false };
    },
    updateChkUniqueState(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList };
    },
  },
};
