import * as service from '../../services/mms/agent';
import * as commonService from '../../services/mms/common';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'agentApply';
const enterPath = 'mms/memberApply/agentApply';
// 基础公共信息
const commonMap = i18n.commonMap();
const validMap = i18n.bizMap('mms/agentVaild');

export default {
  namespace,
  state: {
    currentStep: 0,
    submiting: false,
    form1Data: {},
    form2Data: {},
    form3Data: {},
    bankList: [],
    bizSaleList: [],
    agtNameChkMsg: '',
    agtEmailChkMsg: '',
    agtMobileChkMsg: '',
    // 支行信息
    subBankList: [],
    subBankModalVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryBanklist', payload: {} });
          dispatch({ type: 'queryBizSaleList', payload: {} });
          // dispatch({ type: 'queryPubAreaList', payload: { value: '0' } });
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
      const res = yield call(service.agtApply, { ...submitData });
      const detail = parseResponse(res);
      yield put({
        type: 'updateState',
        payload: { submiting: false },
      });
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        setTimeout(() => {
          console.log('3秒');
          document.getElementById('backToIndx').click();// 提交申请后3秒返回申请首页
        }, 1000);
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    /**
     * 查询地区列表信息
     * @author xuxf 2017-03-20
     */
    // * queryPubAreaList({ payload }, { call, put }) {
    //   yield put({
    //     type: 'updateState',
    //     payload: { ...payload },
    //   });
    //   const res = yield call(commonService.queryPubAreaList, { ...payload });
    //   const result = parseResponse(res);
    //   if (result.rspCod === '200') {
    //     yield put({
    //       type: 'updateState',
    //       payload: { areaOptionList: result.rspList },
    //     });
    //   }
    // },
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
          payload: { subBankList: subBankList, subBankModalVisible: true },
        });
      }
    },
    /**
     * 查询业务员信息
     * @author xuxf 2017-03-21
     */
    * queryBizSaleList({ payload }, { call, put }) {
      const res = yield call(commonService.queryBizSaleList);
      const result = parseResponse(res);
      if (result.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { bizSaleList: result.rspList },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    /**
     * 申请时查询代理商邮箱、手机号、名称是否有重复
     * @author xuxf 2017-04-06
     */
    * validProps({ payload }, { call, put }) {
      const res = yield call(service.queryList, { ...payload });
      const detail = parseResponse(res);
      const type = payload.type;
      if (detail.rspCod === '200' && detail.total > 0) {
        if (type === '1') {
          yield put({
            type: 'updateState',
            payload: { agtMobileChkMsg: validMap.vaildAgentMobile },
          });
        }
        if (type === '2') {
          yield put({
            type: 'updateState',
            payload: { agtEmailChkMsg: validMap.vaildAgentEmail },
          });
        }
        if (type === '3') {
          yield put({
            type: 'updateState',
            payload: { agtNameChkMsg: validMap.vaildAgentName },
          });
        }
      } else {
        // yield put({
        //   type: 'updateState',
        //   payload,
        // });
       
        if (type === '2') {
          yield put({
            type: 'updateState',
            payload: { agtEmailChkMsg: false },
          });
        }
        
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
