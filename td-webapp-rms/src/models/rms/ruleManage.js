import * as service from '../../services/rms/ruleList';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'ruleManage';
const enterPath = '/rms/ruleManage';

const commonMap = i18n.commonMap();
const tableLoad = {
  type: 'updateState',
  payload: { tableLoading: false },
};

const tableRuleLoad = {
  type: 'updateState',
  payload: { tableRuleLoading: false },
};

export default {
  namespace: namespace,
  state: {
    advExpand: false,
    tableParam: { currentPage: 1 },
    tableRuleParam: { currentPage: 1 },
    tableLoading: false,
    tableRuleLoading: false,
    tableList: [],
    tableRuleTotal: 0,
    tableCurrentPage: 1,
    tableRuleCurrentPage: 1,
    tableSelects: [],
    tableTempList: [],
    tableTotal: 0,

    tableDetailList: [],  //规则详情
    tableDetailTotal: 0,
    addRuleList: [],
    tableRuleSelects: [],

    visible: false,
    configModalVisible: false,
    addModalVisible: false,
    updataModalVisible: false,
    ruleGropModalVisible: false,
  },
  // 订阅 queryGroup
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryWarnGroupList', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },
  effects: {
    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableSelects: [], tableLoading: true },
      });
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoad);
    },
    // 查询预警消息
    * queryMessages({ payload }, { call, put }) {
      const res = yield call(service.queryMessages, { ...payload, tmpId: payload.infoTmpId });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'toggleModal',
          payload: { type: 'config', infoTmpId: payload.infoTmpId, infoTmpName: payload.infoTmpName, messageList: detail.rspList },
        });
      }
    },
    // 规则详情
    * ruleDetail({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableRuleSelects: [], tableRuleLoading: true },
      });
      const res = yield call(service.ruleDetail, { ...payload.tableRuleParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        if (!payload.tableRuleParam) {
          yield put({
            type: 'updateState',
            payload: { tableDetailList: detail.rspList, tableDetailTotal: detail.total, tmpId: payload.tmpId, tmpType: payload.tmpType },
          });
        } else {
          yield put({
            type: 'updateState',
            payload: { tableDetailList: detail.rspList, tableDetailTotal: detail.total, tableRuleCurrentPage: payload.tableRuleParam.currentPage, tmpId: payload.tableRuleParam.tmpId, tmpType: payload.tableRuleParam.tmpType },
          });
        }
      }
      yield put(tableRuleLoad);
    },
    * configMess({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, configModalVisible: true },
      });
      const res = yield call(service.configMess, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableDetailList: detail.rspList, tableDetailTotal: detail.total, configModalVisible: false },
        });
      }
      yield put(tableLoad);
    },
    * addOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { addFormSubmit: true, loading: true },
      });
      const res = yield call(service.addOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { addModalVisible: false, addFormSubmit: false, loading: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put(tableRuleLoad);
      } else {
        yield put({
          type: 'updateState',
          payload: { addFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, updateFormSubmit: true, updateloading: true },
      });
      const res = yield call(service.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSuccess',
          payload: { ...payload },
        });
        yield put({
          type: 'updateState',
          payload: { updataModalVisible: false, updateloading: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    // 更新状态
    * updateStatus({ payload }, { call, put }) {
      yield put(tableRuleLoad);
      const res = yield call(service.updateState, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateStatusSuccess',
          payload,
        });
        yield put({
          type: 'updateState',
          payload: { tableRuleLoading: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put(tableLoad);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    // 预警组
    * queryWarnGroupList({ payload }, { call, put }) {
      const res = yield call(service.queryGroup, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { warnGroupList: detail.rspList },
        });
      }
      yield put(tableLoad);
    },
    // 配置规则组
    * addWarnGroup({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { addWarnGroupFormSubmit: true, tableRuleLoad: true },
      });
      const res = yield call(service.addWarnGroup, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { ruleGropModalVisible: false },
        });
        const tableParam = yield select(state => state[namespace].tableRuleParam);
        const res = yield call(service.ruleDetail, { ...tableParam });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableDetailList: detail.rspList, tableDetailTotal: detail.total },
          });
        }
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put(tableRuleLoad);
      } else {
        yield put({
          type: 'updateState',
          payload: { addWarnGroupFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    // 公用状态更新方法 参数的属性和状态的属性一致即可
    updateState(state, action) {
      return { ...state, ...action.payload };
    }, //
    toggleModal(state, action) {
      const updataList = action.payload.data;
      let newState = '';
      switch (action.payload.type) {
        case 'add':
          newState = { ...state, addModalVisible: !state.addModalVisible, addTmpId: action.payload.addTmpId, addTmpType: action.payload.addTmpType, addTmpName: action.payload.addTmpName };
          break;
        case 'config':
          newState = { ...state, configModalVisible: !state.configModalVisible, infoTmpId: action.payload.infoTmpId, infoTmpName: action.payload.infoTmpName, messageList: action.payload.messageList };
          break;
        case 'updata':
          newState = { ...state, updataModalVisible: !state.updataModalVisible, updataList: updataList };
          break;
        case 'group':
          newState = { ...state, ruleGropModalVisible: !state.ruleGropModalVisible, grpRuleId: action.payload.grpRuleId, warnGrps: action.payload.warnGrps, ruleWarnType: action.payload.ruleWarnType };
          break;
        default:
          newState = { ...state, addModalVisible: !state.addModalVisible, ruleDesc: action.payload.ruleDesc };
      }
      return newState;
    },
    updateSuccess(state, action) {
      const newItem = action.payload;

      const newTableList = state.tableDetailList.map((item) => {
        if (item.ruleId === newItem.ruleId) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableDetailList: newTableList };
    },
    updateStatusSuccess(state, action) {
      const ids = action.payload.ruleId;
      const status = action.payload.ruleStatus;
      const newTableList = state.tableDetailList.map((item) => {
        if (ids.indexOf(item.ruleId) !== -1) {
          return { ...item, ruleStatus: status };
        }
        return item;
      });
      return { ...state, tableDetailList: newTableList };
    },
  },
};
