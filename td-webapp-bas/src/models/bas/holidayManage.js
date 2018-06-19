import * as service from '../../services/bas/holiday';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'holidayManage';
const objectId = 'holiday';
const enterPath = '/bas/basDataManage/holidayManage';
// 基础公共信息
const commonMap = i18n.commonMap();
// const tableLoadOpt = {
//   type: 'updateState',
//   payload: { tableSelects: [], tableLoading: true },
// };
// const tableLoadFinOpt = {
//   type: 'updateState',
//   payload: { tableLoading: false },
// };

export default {
  namespace,
  state: {
    // advExpand: false,
    holidaysList: [],
    holidaysArray: [],
    calendarLoading: true,
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { queryMonth: '' } });
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
      const res = yield call(service.queryList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        const dateArray = [];
        if (detail.rspList.length > 0) {
          for (let i = 0; i < detail.rspList.length; i++) {
            if (detail.rspList[i].daytype === '1' || detail.rspList[i].daytype === '2') {
              dateArray.push(detail.rspList[i].holiday);
            }
          }
        }
        yield put({
          type: 'updateState',
          payload: { holidaysList: detail.rspList, holidaysArray: dateArray },
        });
      }
      // yield put(tableLoadFinOpt);
    },
    * updateType({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
      });
      const res = yield call(service.updateType, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'queryList',
          payload: { ...payload, queryMonth: payload.queryDay.substring(0, 6) },
        })
        // yield put(tableLoadFinOpt);
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
    * updateStatus({ payload }, { call, put }) {
      // yield put(tableLoadOpt);
      const res = yield call(service.updateListStatus, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'queryList',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        // yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'add':
          newState = { ...state, addModalVisible: !state.addModalVisible, addFormData: action.payload.addFormData };
          break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        default:
          break;
      }
      return newState;
    },
    updateSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateModalVisible: false };
    },
  },
};
