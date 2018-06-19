import * as service from '../../services/merp/merInf';
import { callNotice } from '../../utils/alert';
import { parseResponse } from '../../utils/request';
import * as i18n from '../../utils/i18n';

const enterPath = '/merp/service/MerInf';
const commonMap = i18n.commonMap();

export default {
  namespace: 'merInf',
  state: {
    infoData: {},
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'getMerInf', payload: {} });
        }
      });
    },
  },
  effects: {
    * getMerInf({ payload }, { call, put }) {
      const res = yield call(service.getMerInf);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { infoData: detail.rspData },
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
  },
}
