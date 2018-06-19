import * as service from '../../services/merp/service';
import {parseResponse} from '../../utils/request';
import {callNotice, callModalPage} from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const commonMap = i18n.commonMap();
export default {
  namespace: 'pwdService',
  state: {
    submiting: false,
    checkInvalid: false,
  },
  effects: {
    * updatePwd({payload}, {call, put}) {
      yield put({
        type: 'updateState',
        payload: {submiting: true},
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.updatePwd, {...payload.dat});
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callModalPage(commonMap.success, detail.rspMsg || commonMap.successInfo, 'success', commonMap.okText);
        /*yield put({
          type: 'indexPage/logout',
          payload: {tk: null, loading: false},
        });*/
        setTimeout(() => {
          document.getElementById('backToIndx').click();
        }, 5000);
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
      yield put({
        type: 'updateState',
        payload: {submiting: false},
      });
    },
  },
  reducers: {
    updateState(state, action) {
      return {...state, ...action.payload};
    },
  },
}
