import * as service from '../../services/pms/channelTransfer';
import * as chnService from '../../services/pms/channelTransfer';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'channelTransferApply';
// 基础公共信息
const commonMap = i18n.commonMap();
const enterPath = '/pms/channelApply/channelTransferApply';


export default {
  namespace,
  state: {
    currentStep: 0,
    submiting: false,
    formData: {},
    updateFormData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    bankNo:'',
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
      const res = yield call(service.queryBankList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { bankList: detail.rspData.allBankList },
        });
      }
    },
    * toggleAuthExpand({ payload }, { call, put }) {
      const res = yield call(service.queryBankList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'toggleModal',
          payload: { type: 'assignRole', bankList: detail.rspData },

        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
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
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'assignRole':
          newState = { ...state, updateFormData: action.payload.bankList, authModalVisible: !state.authModalVisible };
          break;
        default:
          break;
      }
      return newState;
    },
  },
};
