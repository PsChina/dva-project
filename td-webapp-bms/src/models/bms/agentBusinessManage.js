import * as service from '../../services/bms/agent';
import * as bizService from '../../services/bms/agentBusiness';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'agentBusinessManage';
const objectId = 'agtId';
const enterPath = '/bms/businessManage/agentBusinessManage';
// 基础公共信息
const commonMap = i18n.commonMap();
const tableLoadOpt = {
  type: 'updateState',
  payload: { tableSelects: [], tableLoading: true },
};
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};
// 业务信息
// 更新业务列表中 指定业务的开关状态
const updateBizChecked = (biz, list, checked) => {
  const l = list;
  for (let i = 0; i < l.length; i++) {
    if (biz === list[i].biz) {
      l[i].checked = checked; break;
    }
  }
  return l;
}

export default {
  namespace,
  state: {
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableSelects: [],
    tableCurrentPage: 1,
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    allOffLineBiz: [],
    allOnLineBiz: [],
    slideVisible: false,
    slideLoading: false,
    slideTitle: '',
    slideAgtId: '',
    offLineModalVisible: false,
    offLineUpdModalVisible: false,
    offLineInfoModalVisible: false,
    curBiz: '',
    curCcy: '',
    curBizData: {},
    curBizLoading: false,
    curAgt: {},
    bizSubmit: false,
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
    * queryList({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put(tableLoadFinOpt);
    },
    * queryBusiness({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { curAgt: payload, slideLoading: true } });
      const id = payload[objectId];
      const res = yield call(bizService.queryBusiness, {}, id);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        const newState = {
          slideAgtId: payload[objectId],
          slideTitle: payload.agtName,
          allOffLineBiz: detail.rspData.offLinePay || [],
          allOnLineBiz: detail.rspData.onLinePay || [],
          slideVisible: true,
          curCcy: payload.ccy,
        };
        yield put({ type: 'updateState', payload: newState });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({ type: 'updateState', payload: { slideLoading: false } });
    },

    * offBusiness({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { slideLoading: true } });
      const { curBiz, id, type } = payload;
      const res = yield call(bizService.offBusiness, { biz: curBiz }, id, type);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.successInfo, 'success');
        yield put({ type: 'turnOffBiz', payload: { curBiz, type: 'offLine' } });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({ type: 'updateState', payload: { slideLoading: false } });
    },
    * submitBusiness({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { bizSubmit: true } });
      const { data, curBiz, id, type, req } = payload;
      let res = {};
      if (req === 'add') {
        res = yield call(bizService.onBusiness, { ...data, biz: curBiz }, id, type);
      } else {
        res = yield call(bizService.updateBusiness, { ...data, biz: curBiz }, id, type);
      }
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.successInfo, 'success');
        yield put({ type: 'updateState', payload: { curBiz: '', offLineModalVisible: false, offLineUpdModalVisible: false } });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({ type: 'updateState', payload: { bizSubmit: false } });
    },
    * queryBusinessData({ payload }, { call, put }) {
      const { id, biz, ccy, type, modal } = payload;
      yield put({ type: 'updateState', payload: {
        curBiz: biz, curBizData: {}, curBizLoading: true,
        offLineUpdModalVisible: type === 'offLine' && modal === 'upd',
        offLineInfoModalVisible: type === 'offLine' && modal === 'info',
      } });
      const res = yield call(bizService.queryOneBusiness, { biz }, id, type);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        const rspData = detail.rspData;
        rspData.ccy = ccy;
        yield put({ type: 'updateState', payload: { curBizData: rspData } });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({ type: 'updateState', payload: { curBizLoading: false } });
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    closeSlide(state) {
      return { ...state, slideVisible: false, slideTitle: '', slideAgtId: '', allOffLineBiz: [], allOnLineBiz: [] };
    },
    closeUpdateModal(state, action) {
      const { type } = action.payload;
      let newState = {};
      switch (type) {
        case 'offLine': {
          newState = { offLineUpdModalVisible: false, curBiz: '' };
          break;
        }
        case 'onLine': {
          break;
        }
        default: break;
      }
      return { ...state, ...newState };
    },
    turnOnBiz(state, action) {
      const { curBiz, ccy, type } = action.payload;
      let newState = {};
      switch (type) {
        case 'offLine': {
          newState = { curBiz, curBizData: { ccy }, offLineModalVisible: true, allOffLineBiz: updateBizChecked(curBiz, state.allOffLineBiz, true) };
          break;
        }
        case 'onLine': {
          break;
        }
        default: break;
      }
      return { ...state, ...newState };
    },
    turnOffBiz(state, action) {
      const { curBiz, type } = action.payload;
      let newState = {};
      switch (type) {
        case 'offLine': {
          newState = { curBiz, allOffLineBiz: updateBizChecked(curBiz, state.allOffLineBiz, false) };
          break;
        }
        case 'onLine': {
          break;
        }
        default: break;
      }
      return { ...state, ...newState };
    },
    cancelBiz(state, action) {
      const { type, biz } = action.payload;
      let newState = {};
      switch (type) {
        case 'offLine': {
          newState = { curBiz: '', offLineModalVisible: false, allOffLineBiz: updateBizChecked(biz, state.allOffLineBiz, false) };
          break;
        }
        case 'onLine': {
          break;
        }
        default: break;
      }
      return { ...state, ...newState };
    },
  },
}
