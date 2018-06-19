import * as service from '../../services/pms/merchantTransfer';
import * as chnService from '../../services/pms/channelTransfer';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'merchantTransferApply';
const enterPath = '/pms/merchantApply/merchantTransferApply';
// 基础公共信息
const commonMap = i18n.commonMap();


export default {
  namespace,
  state: {
    advExpand: false,
    submiting: false,
    formData: {},
    chnList: [],

    filePath: '',
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    linkType: '',
    scanType: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryChnList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },
  effects: {
    // query chn select list
    * queryChnList({ payload }, { call, put }) {
      const res = yield call(chnService.querySelect, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { chnList: detail.rspList },
        });
      }
    },

    // add merchant
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submiting: true, formData: payload.formData },
      });
      const formData = yield select(state => state[namespace].formData);
      const submitData = { ...formData };
      const res = yield call(service.addOne, { ...submitData });
      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { submiting: false },
      });
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put({
          type: 'updateState',
          payload: { formData: {} },
        });
        // obj.props.form.resetFields();
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    // import merchants
    * addBatch({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { droSubmit: true, formData: payload.formData },
      });
      const submitData = yield select(state => state[namespace].formData);
      // console.log('submitData===', submitData)

      const res = yield call(service.bussAddBatchExcel, { ...submitData });

      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { droSubmit: false },
      });
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    // change
    * handlerTransfer({ payload }, { put }) {
      const authData = payload.data.authData;
      const formData = authData.data;
       console.log('authData==', authData);
      if (authData.insideTransferStatus !== undefined) {
        formData.insideTransferStatus = !formData.insideTransferStatus;
      }
        if (authData.outsideTransferStatus !== undefined) {
        formData.outsideTransferStatus = !formData.outsideTransferStatus;
      }
       console.log('formData', formData);
      yield put({
        type: 'updateState',
        payload: { updateFormData: formData },
      });
    },
    // change file data
    * changeFileData({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: { filePath: payload.data },
      });
    },
  },
  reducers: {
    // update simple state
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    // toggle limit
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
    },

  },

};
