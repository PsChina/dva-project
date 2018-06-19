import * as service from '../../services/pms/channelScancode';
import * as bankService from '../../services/pms/channelTransfer';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'channelScancodeApply';
// 基础公共信息
const commonMap = i18n.commonMap();
const enterPath = '/pms/channelApply/channelScancodeApply';


export default {
  namespace,
  state: {
    advExpand: false,
    submiting: false,
    formData: {},
    txnChannelSupportList: [],
    fileList:[],
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
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
    * uploadLogo({ payload }, { call, put }){

      const res1 = yield call(service.uploadLogo, {...payload});
      const result = parseResponse(res1);
      //FJID_PIC_INPUT.value = result.FJID_PIC_1;
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
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
    },
  },
};
