import * as service from '../../services/sms/chnChkErrorAudit';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

const commonMap = i18n.commonMap();

const namespace = 'chnChkErrorAudit';
const enterPath = '/sms/chkManage/chnChkErrorAudit';

const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};

export default {
  namespace,
  state: {
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,

    data: {},
    updateFormData: {},

    auditModalVisible: false,
    auditData: {},
    auditFormSubmit: false,
    auditFormReject: false,

    auditHisData: [],
    loading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },

  effects: {
    // query doubt result list
    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableLoading: true },
      });
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },

    * auditErrorDeal({ payload }, { call, put }) {
      if (payload.auditStatus === '1') {
        yield put({
          type: 'updateState',
          payload: { auditFormSubmit: true },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { auditFormReject: true },
        });
      }

      const res = yield call(service.auditErrorDeal, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { auditModalVisible: false, auditFormSubmit: false, auditFormReject: false },
        });
        const res = yield call(service.queryList, { });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: '1' },
          });
        }
        callNotice(commonMap.success, detail.rspMsg || commonMap.successInfo, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { auditModalVisible: false, auditFormSubmit: false, auditFormReject: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    // 审核历史
    * queryAuditHis({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const res = yield call(service.queryAuditHis, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { auditHisData: detail.rspList, loading: false },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

  },

  reducers: {
    // update simple state value
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'auditHis':
          newState = { ...state, auditHisData: action.payload.data, auditHisModalVisible: !state.auditHisModalVisible };
          break;
        default:
          break;
      }
      return newState;
    },

    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */
  },
};
