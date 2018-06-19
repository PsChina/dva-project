import * as service from '../../services/merp/merStlManage';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const namespace = 'merStlWithdraw';
const enterPath = '/merp/stlManage/merStlWithdraw';

export default {
  namespace,
  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryOne', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },

  effects: {
    // query one detail
    * queryOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      const res = yield call(service.queryOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { data: detail.rspData, detailModalVisible: true },
        });
      }
    },
  },

  reducers: {
        // update simple state value
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
