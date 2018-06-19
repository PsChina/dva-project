import * as service from '../../services/mms/merchant';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as commonService from '../../services/mms/common';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'merchantGlobalApply';
// 基础公共信息
const commonMap = i18n.commonMap();
const enterPath = '/mms/memberApply/merchantGlobalApply';
export default {
  namespace,
  state: {
    currentStep: 0,
    submiting: false,
    form1Data: {},
    form2Data: {},
    form3Data: {},
    agentData: {},
    agentModalVisible: false,
    subBankModalVisible: false,
    bizSaleList: [],
    bankList: [],
    subBankList: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryBizSaleList', payload: {} });
          dispatch({ type: 'queryBanklist', payload: {} });
        }
      });
    },
  },
  effects: {
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submiting: true, form3Data: payload.form3Data },
      });
      const form1Data = yield select(state => state[namespace].form1Data);
      const form2Data = yield select(state => state[namespace].form2Data);
      const form3Data = yield select(state => state[namespace].form3Data);
      const submitData = { ...form1Data, ...form2Data, ...form3Data };
      const res = yield call(service.merchantGlobalApply, { ...submitData });
      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { submiting: false },
      });
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        setTimeout(() => {
          console.log('3秒');
          document.getElementById('backToMerIndx').click();// 提交申请后3秒返回申请首页
        }, 1000);
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryBizSaleList({ payload }, { call, put }) {
      const res = yield call(commonService.queryBizSaleList);
      const result = parseResponse(res);
      if (result.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { bizSaleList: result.rspList },
        });
      } else {
        callNotice(commonMap.fail, result.rspMsg || commonMap.failInfo, 'error');
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
     * @author xuxf 2017-05-18
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
    * queryAgentList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { agentModalVisible: true },
        });
      }
      const tempAgtData = {};
      tempAgtData.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { agentData: tempAgtData },
      });
      const res = yield call(service.queryAgentList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempAgtData.tableList = detail.rspList;
        tempAgtData.tableTotal = detail.total;
        tempAgtData.tableCurrentPage = payload.tableParam.currentPage
        tempAgtData.tableLoading = false;
        tempAgtData.tableParam = payload.tableParam
        if (tempAgtData.tableParam.isFirst) {
          delete tempAgtData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { agentData: tempAgtData },
        });
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
