import { routerRedux } from 'dva/router';
import * as service from '../../services/merp/merchantStore';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'merchantStoreApply';
// 基础公共信息
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('merp/merchantStore');
export default {
  namespace,
  state: {
    currentStep: 1,
    submiting: false,
    form1Data: { merId: '' },
    form2Data: {},
    merchantData: {},
    merInfoModalVisible: false,
    storeTotal: '0',
  },
  effects: {
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submiting: true, form2Data: payload.form2Data },
      });
      const form1Data = yield select(state => state[namespace].form1Data);
      const form2Data = yield select(state => state[namespace].form2Data);
      const submitData = { ...form1Data, ...form2Data };
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
          payload: { currentStep: 1, form2Data: {}, form1Data: {} },
        });
        yield put((routerRedux.push('/merp/store/storeApply')));
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
        yield put({
          type: 'updateState',
          payload: { currentStep: 1, form2Data: {}, form1Data: {} },
        });
      }
    },
    /**
     * 查询商户是否有默认门店
     * @author xuxf 2017-05-05
     */
    * queryStoreTotal({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      const data = payload.dat;
      const res = yield call(service.queryList, { ...payload });
      const result = parseResponse(res);
      if (result.rspCod === '200') {
        // const total = result.total;
        // if (total < 1) {
        //   callNotice(commonMap.warning, bizMap.existStoreWarning || commonMap.warning, 'warning');
        // } else {
        //   yield put({
        //     type: 'updateState',
        //     payload: { currentStep: 2, form1Data: data },
        //   });
        // }
        yield put({
          type: 'updateState',
          payload: { currentStep: 2, form1Data: data },
        });
      } else {
        callNotice(commonMap.fail, result.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
