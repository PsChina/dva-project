import * as service from '../../services/rms/ruleList';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';


const namespace = 'ruleMessageManage';
const enterPath = '/rms/ruleMessageManage';

const commonMap = i18n.commonMap();
const tableLoadOpt = {
  type: 'updateState',
  payload: { tableLoading: true },
};

const tableLoad = {
  type: 'updateState',
  payload: { tableLoading: false },
};
const tableRuleLoadTrue = {
  type: 'updateState',
  payload: { tableRuleLoading: false },
};
// const loading = {
//   type: 'updateState',
//   payload: { loading: false },
// };
export default {
  namespace: namespace,
  state: {
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableCurrentPage: 1,
    tableSelects: [],
    tableTotal: 0,

    addRuleList: [],

    visible: false,
    updataModalVisible: false,
    ruleGropModalVisible: false,
  },
  // 订阅 queryGroup
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryWarnGroupList', payload: {} });
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
      const res = yield call(service.ruleDetail, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoad);
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
          payload: { tableList: detail.rspList, tableTotal: detail.total, configModalVisible: false },
        });
      }
      yield put(tableLoad);
    },
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { addFormSubmit: true },
      });
      const res = yield call(service.addOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { addModalVisible: false, addFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        const tableParam = yield select(state => state.ruleManage.tableRuleParam);
        yield put({
          type: 'updateState',
          payload: { tableRuleSelects: [], tableRuleLoading: true },
        });
        const res = yield call(service.ruleDetail, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoad);
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
        payload: { ...payload, updateFormSubmit: true, loading: true },
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
          payload: { updataModalVisible: false, loading: false },
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
      yield put(tableLoadOpt);
      const res = yield call(service.updateState, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateStatusSuccess',
          payload,
        });
        yield put({
          type: 'updateState',
          payload: { tableLoading: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put(tableLoadOpt);
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
        const tableParam = yield select(state => state[namespace].tableParam);
        const res = yield call(service.ruleDetail, { ...tableParam });
        const detail = parseResponse(res);
        if (detail.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
          });
        }
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put(tableRuleLoadTrue);
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
          newState = { ...state, addModalVisible: !state.addModalVisible, addTmpId: action.payload.addTmpId, addTmpType: action.payload.addTmpType };
          break;
        case 'config':
          newState = { ...state, configModalVisible: !state.configModalVisible, infoTmpId: action.payload.infoTmpId };
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
      const newTableList = state.tableList.map((item) => {
        if (item.ruleId === newItem.ruleId) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList };
    },
    updateStatusSuccess(state, action) {
      const ids = action.payload.ruleId;
      const status = action.payload.ruleStatus;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item.ruleId) !== -1) {
          return { ...item, ruleStatus: status };
        }
        return item;
      });
      return { ...state, tableList: newTableList };
    },
  },
};
