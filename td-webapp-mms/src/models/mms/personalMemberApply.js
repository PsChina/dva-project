import * as service from '../../services/mms/personalMember';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'personalMemberApply';
// 基础公共信息
const commonMap = i18n.commonMap();

export default {
  namespace,
  state: {
    currentStep: 0,
    submiting: false,
    form1Data: {},
    form2Data: {},
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
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
