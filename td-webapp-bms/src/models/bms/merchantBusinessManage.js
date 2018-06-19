import * as service from '../../services/bms/merchant';
import * as bizService from '../../services/bms/merchantBusiness';
// import * as chnService from '../../services/bms/channelMerchant';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';
import { stat } from 'fs';

// 基础配置信息
const namespace = 'merchantBusinessManage';
const objectId = 'merId';
const enterPath = '/bms/businessManage/merchantBusinessManage';
// 基础公共信息
const commonMap = i18n.commonMap();
const stlMap = i18n.bizMap('bms/businessRealTimeStl');
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
    allRealTimeStlBiz: [],
    slideVisible: false,
    slideLoading: false,
    slideTitle: '',
    slideMerId: '',
    offLineModalVisible: false,
    offLineUpdModalVisible: false,
    offLineInfoModalVisible: false,
    realTimeStlModalVisible: false,
    realTimeStlUpdModalVisible: false,
    realTimeStlInfoModalVisible: false,
    curBiz: '',
    curCcy: '',
    curBizData: {},
    curBizLoading: false,
    curMer: {},
    curChnMers: [],
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
      yield put({ type: 'updateState', payload: { curMer: payload, slideLoading: true } });
      const id = payload[objectId];
      const res = yield call(bizService.queryBusiness, {}, id);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        const newState = {
          slideMerId: payload[objectId],
          slideTitle: payload.merName,
          allOffLineBiz: detail.rspData.offLinePay || [], // 添加线下支付通道
          allOnLineBiz: detail.rspData.onLinePay || [],
          allRealTimeStlBiz: detail.rspData.realTimeSettlement || [],
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
        yield put({ type: 'turnOffBiz', payload: { curBiz, type } });
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
        // yield put({ type: 'updateState', payload: { curBiz: '', offLineModalVisible: false, offLineUpdModalVisible: false } });
        yield put({ type: 'closeModal', payload: { type } });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      yield put({ type: 'updateState', payload: { bizSubmit: false } });
    },
    // * queryChannelMerchants({ payload }, { call, put }) {
    //   const res = yield call(chnService.queryList, { biz: payload.biz, merId: payload.merId });
    //   const detail = parseResponse(res);
    //   if (detail.rspCod === '200') {
    //     yield put({ type: 'updateState', payload: { curChnMers: detail.rspList } });
    //   } else {
    //     callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
    //   }
    // },
    * queryBusinessData({ payload }, { call, put }) {
      const { id, biz, ccy, type, modal } = payload;
      yield put({ type: 'updateState', payload: {
        curBiz: biz, curBizData: {}, curBizLoading: true,
        offLineUpdModalVisible: type === 'offLine' && modal === 'upd',
        offLineInfoModalVisible: type === 'offLine' && modal === 'info',
        realTimeStlUpdModalVisible: type === 'realTimeStl' && modal === 'upd',
        realTimeStlInfoModalVisible: type === 'realTimeStl' && modal === 'info',
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
      return {
        ...state, slideVisible: false, slideTitle: '', slideMerId: '',
        allOffLineBiz: [], allOnLineBiz: [], allRealTimeStlBiz: [],
      };
    },
    closeModal(state, action) {
      const { type } = action.payload;
      let newState = {};
      switch (type) {
        case 'offLine': {
          newState = { offLineModalVisible: false, offLineUpdModalVisible: false, curBiz: '' };
          break;
        }
        case 'onLine': {
          break;
        }
        case 'realTimeStl': {
          newState = { realTimeStlModalVisible: false, realTimeStlUpdModalVisible: false, curBiz: '' };
          break;
        }
        default: break;
      }
      return { ...state, ...newState };
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
        case 'realTimeStl': {
          newState = { realTimeStlUpdModalVisible: false, curBiz: '' };
          break;
        }
        default: break;
      }
      return { ...state, ...newState };
    },
    turnOnBiz(state, action) {
      console.log( state ,action ) // eslint-disable-line
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
        case 'realTimeStl': {
          if (curBiz === 'd0') {
            const bizList = state.allRealTimeStlBiz;
            const t0Biz = bizList[0].biz === 't0' ? bizList[0] : bizList[1];
            if (t0Biz.checked === 'false' || t0Biz.checked === false) {
              callNotice(commonMap.warning, stlMap.t0First, 'warning');
              return { ...state };
            }
          }
          newState = { curBiz, curBizData: {}, realTimeStlModalVisible: true, allRealTimeStlBiz: updateBizChecked(curBiz, state.allRealTimeStlBiz, true) };
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
        case 'realTimeStl': {
          newState = { curBiz, allRealTimeStlBiz: updateBizChecked(curBiz, state.allRealTimeStlBiz, false) };
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
        case 'realTimeStl': {
          newState = { curBiz: '', realTimeStlModalVisible: false, allRealTimeStlBiz: updateBizChecked(biz, state.allRealTimeStlBiz, false) };
          break;
        }
        default: break;
      }
      return { ...state, ...newState };
    },
  },
};
