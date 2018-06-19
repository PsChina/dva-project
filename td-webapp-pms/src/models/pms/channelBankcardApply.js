import * as service from '../../services/pms/channelBankcard';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';
import * as bankService from '../../services/pms/channelTransfer';

// 基础配置信息
const namespace = 'channelBankcardApply';
const enterPath = '/pms/channelApply/channelBankcardApply';
// 基础公共信息
const commonMap = i18n.commonMap();
const validMap = i18n.bizMap('pms/channelBankcardValid');

export default {
  namespace,
  state: {
    advExpand: false,
    submiting: false,
    formData: {},

    authModalVisible: false,
    updateFormData: {},
    pospayTxnSup: '11111111111111',

    chnNameChkMsg: '',
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'updateState', payload: { advExpand: false } });
        }
      });
    },
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
      const res = yield call(bankService.queryBankList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { bankList: detail.rspData.allBankList },
        });
      }
    },
    // add channel
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

    // 银行卡权限内部开关修改
    // change auth switch component
    * changeAuthData({ payload }, { put }) {
      const authData = payload.data.authData;
      const formData = authData.data;
      if (authData.yecxStatus !== undefined) {
        formData.yecxStatus = !formData.yecxStatus;
      }
      if (authData.xfStatus !== undefined) {
        formData.xfStatus = !formData.xfStatus;
        if (!authData.xfStatus) {
          formData.xfczStatus = false;
        }
      }
      if (authData.xfczStatus !== undefined) {
        formData.xfczStatus = !formData.xfczStatus;
      }
      if (authData.cxStatus !== undefined) {
        formData.cxStatus = !formData.cxStatus;
        if (!authData.cxStatus) {
          formData.cxczStatus = false;
        }
      }
      if (authData.cxczStatus !== undefined) {
        formData.cxczStatus = !formData.cxczStatus;
      }
      if (authData.thStatus !== undefined) {
        formData.thStatus = !formData.thStatus;
      }
      if (authData.ysqStatus !== undefined) {
        formData.ysqStatus = !formData.ysqStatus;
        if (!authData.ysqStatus) {
          formData.cxczStatus = false;
          formData.ysqczStatus = false;
          formData.ysqcxStatus = false
          formData.ysqcxczStatus = false
          formData.ysqwcStatus = false
          formData.ysqwcczStatus = false
          formData.ysqwccxStatus = false
          formData.ysqwccxczStatus = false
        }
      }
      if (authData.ysqczStatus !== undefined) {
        formData.ysqczStatus = !formData.ysqczStatus;
      }
      if (authData.ysqcxStatus !== undefined) {
        formData.ysqcxStatus = !formData.ysqcxStatus;
        if (!authData.ysqcxStatus) {
          formData.ysqcxczStatus = false;
        }
      }
      if (authData.ysqcxczStatus !== undefined) {
        formData.ysqcxczStatus = !formData.ysqcxczStatus;
      }
      if (authData.ysqwcStatus !== undefined) {
        formData.ysqwcStatus = !formData.ysqwcStatus;
        if (!authData.ysqwcStatus) {
          formData.ysqwcczStatus = false;
        }
      }
      if (authData.ysqwcczStatus !== undefined) {
        formData.ysqwcczStatus = !formData.ysqwcczStatus;
      }
      if (authData.ysqwccxStatus !== undefined) {
        formData.ysqwccxStatus = !formData.ysqwccxStatus;
        if (!authData.ysqwccxStatus) {
          formData.ysqwccxczStatus = false;
        }
      }
      if (authData.ysqwccxczStatus !== undefined) {
        formData.ysqwccxczStatus = !formData.ysqwccxczStatus;
      }
      yield put({
        type: 'updateState',
        payload: { updateFormData: formData },
      });
    },
    // chnName or chnAlias reapeat check
    * checkChnName({ payload }, { call, put }) {
      const res = yield call(service.checkChnName, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload,
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { chnNameChkMsg: validMap.validChnRepeat },
        });
      }
    },
  },
  reducers: {
    // update simple state value
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    // change limit component
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
    },
    // open auth component
    toggleAuthExpand(state, action) {
      let newState = state;
      const formData = {};
      const fPospayTxnSup = action.payload.fPospayTxnSup;
      const pospayTxnSup = action.payload.pospayTxnSup;
      formData.fYecxStatus = fPospayTxnSup.substring(0, 1) === '1';
      formData.fXfStatus = fPospayTxnSup.substring(1, 2) === '1';
      formData.fXfczStatus = fPospayTxnSup.substring(2, 3) === '1';
      formData.fCxStatus = fPospayTxnSup.substring(3, 4) === '1';
      formData.fCxczStatus = fPospayTxnSup.substring(4, 5) === '1';
      formData.fThStatus = fPospayTxnSup.substring(5, 6) === '1';
      formData.fYsqStatus = fPospayTxnSup.substring(6, 7) === '1';
      formData.fYsqczStatus = fPospayTxnSup.substring(7, 8) === '1';
      formData.fYsqcxStatus = fPospayTxnSup.substring(8, 9) === '1';
      formData.fYsqcxczStatus = fPospayTxnSup.substring(9, 10) === '1';
      formData.fYsqwcStatus = fPospayTxnSup.substring(10, 11) === '1';
      formData.fYsqwcczStatus = fPospayTxnSup.substring(11, 12) === '1';
      formData.fYsqwccxStatus = fPospayTxnSup.substring(12, 13) === '1';
      formData.fYsqwccxczStatus = fPospayTxnSup.substring(13, 14) === '1';
      // 本级银行卡交易类
      formData.yecxStatus = fPospayTxnSup.substring(0, 1) === '1' && pospayTxnSup.substring(0, 1) === '1';
      formData.xfStatus = fPospayTxnSup.substring(1, 2) === '1' && pospayTxnSup.substring(1, 2) === '1';
      formData.xfczStatus = fPospayTxnSup.substring(2, 3) === '1' && pospayTxnSup.substring(2, 3) === '1';
      formData.cxStatus = fPospayTxnSup.substring(3, 4) === '1' && pospayTxnSup.substring(3, 4) === '1';
      formData.cxczStatus = fPospayTxnSup.substring(4, 5) === '1' && pospayTxnSup.substring(4, 5) === '1';
      formData.thStatus = fPospayTxnSup.substring(5, 6) === '1' && pospayTxnSup.substring(5, 6) === '1';
      formData.ysqStatus = fPospayTxnSup.substring(6, 7) === '1' && pospayTxnSup.substring(6, 7) === '1';
      formData.ysqczStatus = fPospayTxnSup.substring(7, 8) === '1' && pospayTxnSup.substring(7, 8) === '1';
      formData.ysqcxStatus = fPospayTxnSup.substring(8, 9) === '1' && pospayTxnSup.substring(8, 9) === '1';
      formData.ysqcxczStatus = fPospayTxnSup.substring(9, 10) === '1' && pospayTxnSup.substring(9, 10) === '1';
      formData.ysqwcStatus = fPospayTxnSup.substring(10, 11) === '1' && pospayTxnSup.substring(10, 11) === '1';
      formData.ysqwcczStatus = fPospayTxnSup.substring(11, 12) === '1' && pospayTxnSup.substring(11, 12) === '1';
      formData.ysqwccxStatus = fPospayTxnSup.substring(12, 13) === '1' && pospayTxnSup.substring(12, 13) === '1';
      formData.ysqwccxczStatus = fPospayTxnSup.substring(13, 14) === '1' && pospayTxnSup.substring(13, 14) === '1';

      newState = { ...state, authModalVisible: !state.authModalVisible, updateFormData: formData };
      return newState;
    },
  },
};
