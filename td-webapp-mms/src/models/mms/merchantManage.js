import * as service from '../../services/mms/merchant';
import * as commonService from '../../services/mms/common';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'merchantManage';
const objectId = 'merId';
const enterPath = '/mms/memberManage/merchantManage';
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
    spinLoading: false,
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    tableRecord: {},
    updateBaseModalVisible: false,
    updateBankModalVisible: false,
    updateOtherModalVisible: false,
    memberManagementVisible: false,
    bizSaleList: [],
    subBankModalVisible: false,
    bankList: [],
    subBankList: [],
    soId:undefined,
    displayModal:true,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryBizSaleList', payload: {} });
          dispatch({ type: 'queryBanklist', payload: {} });
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
      console.log('res内容为：',res)
      const detail = parseResponse(res);
      console.log('detail内容为：',detail);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
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
     * 查询银行信息
     * @author xuxf 2017-03-20
     */
    * queryBanklist({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      const res = yield call(commonService.queryBanklist, { ...payload });
      const result = parseResponse(res);
      if (result.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { bankList: result.rspList },
        });
      }
    },
    /**
     * 查询总行行号
     * @author xuxf 2017-05-25
     */
    * querySubBanklist({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { subBankModalVisible: true },
      });
      const subBankList = {};
      subBankList.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { subBankList: subBankList },
      });
      const param = payload.tableParam;
      const res = yield call(commonService.querySubBanklist, { ...param });
      const result = parseResponse(res);
      if (result.rspCod === '200') {
        subBankList.tableList = result.rspList;
        subBankList.tableTotal = result.total;
        subBankList.tableCurrentPage = payload.tableParam.currentPage
        subBankList.tableLoading = false;
        subBankList.tableParam = payload.tableParam
        if (subBankList.tableParam.isFirst) {
          delete subBankList.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { subBankList: subBankList },
        });
      }
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
      const res = yield call(commonService.queryAttach, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { attachInfoData: detail.rspData, spinLoading: false },
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
    * updateBank({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateAcc, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateBankSuccess',
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
    * updateOther({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateOther, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateOtherSuccess',
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
    /* 开通套餐 */
    * openMeal({ payload }, { call, put }){
      yield put({
        type: 'toggleModal',
        payload: { type: 'memberManagement', data: {} },
      })
      const res = yield call(service.openMeal, { ...payload });
      const result = parseResponse(res);
      if (result.rspCod === '000000') {
        callNotice(commonMap.success, result.rspMsg || commonMap.success, 'success');
      }else{
        callNotice(commonMap.fail, result.rspMsg || commonMap.failInfo, 'error');
      }
    }
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
        case 'updateBank':
          newState = { ...state, updateFormData: action.payload.data, updateBankModalVisible: !state.updateBankModalVisible };
          break;
        case 'updateOther':
          newState = { ...state, updateFormData: action.payload.data, updateOtherModalVisible: !state.updateOtherModalVisible };
          break;
        case 'memberManagement':
          newState = { ...state, updateFormData: action.payload.data, memberManagementVisible: !state.memberManagementVisible, firstLoad:!state.firstLoad };
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
      const merStatus = action.payload.merStatus;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, merStatus: merStatus };
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
    updateBankSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateBankModalVisible: false };
    },

    updateOtherSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateOtherModalVisible: false };
    },
  },
};
