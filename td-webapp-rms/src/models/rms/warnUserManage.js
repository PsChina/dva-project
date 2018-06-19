import * as service from '../../services/rms/warnUser';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';
import * as miniFormService from '../../services/rms/user';

const commonMap = i18n.commonMap();
const tableLoadOpt = {
  type: 'updateState',
  payload: { tableSelects: [], tableLoading: true },
};
const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};
const miniFormTableLoadFinOpt = {
  type: 'updateState',
  payload: { miniFormTableLoading: false },
};

export default {
  namespace: 'warnUserManage',
  state: {
    advExpand: false,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableSelects: [],
    addModalVisible: false,
    addFormSubmit: false,
    updateModalVisible: false,
    updateFormSubmit: false,
    detailModalVisible: false,
    configModalVisible: false,
    modalFormData: {},
    detailDataList: {},
    configWarnGroupData: [],
    configGroupList: [],
    headquartersGroupList: [],
    branchOfficeGroupList: [],
    agentGroupList: [],
    updateGroupList: [],
    orgDataList: [],
    updateList: [],
    selected: false,
    addKey: 0,
    orgId: '',
    // 各类(总公司 分公司 代理商)机构列表 总公司默认为棠宝电商 不允许修改
    companyList: [{ orgId: '000000002', orgName: '棠宝电商' }],
    branchCompanyList: [{ orgId: '000000001', orgName: '运营机构' }],
    agentList: [{ agtId: '000003', agtName: '测试代理商' }],
    agentUserList: [],
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/rms/warmUser/warnUserManage') {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1, requestType: 'table' } } });
          //  dispatch({ type: 'queryUserList', payload: { miniFormTableParam: { currentPage: '1' } } });
          // dispatch({ type: 'branchOfficeGroupList', payload: { tableParam: { orgType: '1' } } });
          // dispatch({ type: 'agentGroupList', payload: { tableParam: { orgType: '2' } } });
          //dispatch({ type: 'queryAgtList', payload: { miniFormTableParam: { currentPage: '1' } } });
          // dispatch({ type: 'branchCompanyList', payload: { orgType: '0', requestType: 'select' } });
          dispatch({ type: 'agentList', payload: { orgType: '02', requestType: 'select' } });
        }
      });
    },
  },
  effects: {
    * queryUserList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, miniFormTableLoading: true },
      });
      const res = yield call(miniFormService.queryList, { ...payload.miniFormTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { miniFormTableList: detail.rspList, miniFormTableTotal: detail.total, miniFormTableCurrentPage: payload.miniFormTableParam.currentPage },
        });
      }
      yield put(miniFormTableLoadFinOpt);
    },
    * queryAgtList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, miniFormTableLoading: true },
      });
      const res = yield call(miniFormService.queryAgtList, { ...payload.miniFormTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { miniFormTableList: detail.rspList, miniFormTableTotal: detail.total, miniFormTableCurrentPage: payload.miniFormTableParam.currentPage },
        });
      }
      yield put(miniFormTableLoadFinOpt);
    },
    * headquartersGroupList({ payload }, { call, put }) {
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.warnGroup, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { headquartersGroupList: detail.rspList },
        });
      }
    },
    * branchOfficeGroupList({ payload }, { call, put }) {
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.warnGroup, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { branchOfficeGroupList: detail.rspList },
        });
      }
    },
    * agentGroupList({ payload }, { call, put }) {
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.warnGroup, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { agentGroupList: detail.rspList },
        });
      }
    },
    * configWarnGroup({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        //  页面传递的payload参数内，有tableParam属性
        payload: { ...payload, configModalVisible: true },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.configWarnGroup, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { updateGroupList: detail.rspList },
        });
      }
      yield put(tableLoadFinOpt);
    },

    * updateWarnGroup({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { formSubmit: true },
      });
      const res = yield call(service.updateWarnGroup, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSuccess',
          payload: { configModalVisible: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { formSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        //  页面传递的payload参数内，有tableParam属性
        payload: { ...payload, tableSelects: [], tableLoading: true },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total },
        });
      }
      yield put(tableLoadFinOpt);
    },

    * orgList({ payload }, { call, put }) {
      const res = yield call(service.queryOrgList, payload);
      const detail = parseResponse(res);
      if (detail.rspCod === 200) {
        yield put({
          type: 'updateState',
          payload: { orgDataList: detail.rspList },
        });
      }
      yield put(tableLoadFinOpt);
    },

    * branchCompanyList({ payload }, { call, put }) {
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryOrgList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === 200) {
        yield put({
          type: 'updateState',
          payload: { branchCompanyList: detail.rspList },
        });
      }
    },

    * agentList({ payload }, { call, put }) {
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryOrgList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { agentUserList: detail.rspList },
        });
      }
    },
    * deleteList({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(service.deleteList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        const tableParam = yield select(state => state.warnUserManage.tableParam);
        yield put(tableLoadOpt);
        const res = yield call(service.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSuccess',
          payload,
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
        const tableParam = yield select(state => state.warnUserManage.tableParam);
        yield put({
          type: 'updateState',
          payload: { tableSelects: [], tableLoading: true },
        });
        const res = yield call(service.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { addFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateStatus({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.updateList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateStatusSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
    },

    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'add':
          newState = { ...state, addModalVisible: !state.addModalVisible,miniFormVisible:false, orgDataList: state.agentUserList, addKey: Math.ceil(Math.random() * 100) };
          break;
        case 'update': {
          const orgType = action.payload.data.orgType;
          let orgDataList = [];
          switch (orgType) {
            case '01': orgDataList = state.branchCompanyList; break;
            case '02': orgDataList = state.agentList; break;
            default: orgDataList = state.companyList; break;
          }
          newState = { ...state, updateModalVisible: !state.updateModalVisible, modalFormData: action.payload.data, orgDataList };
          break;
        }
        case 'detail':
          newState = { ...state, detailModalVisible: !state.detailModalVisible, detailDataList: action.payload.data };
          break;
        case 'config':
          newState = { ...state, configModalVisible: !state.configModalVisible, orgType: action.payload.orgType, userId: action.payload.userId };
          break;
        case 'user':
          newState = { ...state, addFormData: action.payload.data, miniFormVisible: !state.miniFormVisible };
          break;
        default:
          break;
      }
      return newState;
    },

    // 公用状态更新方法 参数的属性和状态的属性一致即可
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    updateSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item.userId === newItem.userId) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateModalVisible: false, configModalVisible: false };
    },
    updateStatusSuccess(state, action) {
      const ids = action.payload.ids;
      const status = action.payload.status;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item.userId) !== -1) {
          return { ...item, userStatus: status };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },

    updateFormOrgType(state, action) {
      const modalFormData = state.modalFormData;
      modalFormData.orgType = action.payload.orgType;
      modalFormData.orgId = '';
      let orgDataList = [];
      switch (action.payload.orgType) {
        case '01': orgDataList = state.branchCompanyList; break;
        case '02': orgDataList = state.agentList; break;
        default: orgDataList = state.companyList; break;
      }
      return { ...state, modalFormData, orgDataList };
    },
    updateFormOrgTypeAdd(state, action) {
      const modalFormData = state.modalFormData;
      const org = action.payload.orgType;
      modalFormData.orgType = action.payload.orgType;
      modalFormData.orgId = '';
      let orgDataList = [];
      switch (action.payload.orgType) {
        case '01': orgDataList = state.branchCompanyList; break;
        case '02': orgDataList = state.agentUserList; break;
        default: orgDataList = state.companyList; break;
      }
      return { ...state, modalFormData, orgDataList, org };
    },
  },
};
