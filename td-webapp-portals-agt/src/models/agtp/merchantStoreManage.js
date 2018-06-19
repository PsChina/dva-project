import * as service from '../../services/agtp/merchantStore';
import * as commonService from '../../services/agtp/common';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import * as i18n from '../../utils/i18n';
import Config from '../../../config/config.json';

// 基础配置信息
const namespace = 'merchantStoreManage';
const objectId = 'braId';
const enterPath = '/agtp/merchantManage/MerchantStoreManage';
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
// 编辑这里
export default {
  namespace,
  state: {
    tableCurrentPage: 1,
    advExpand: false,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableSelects: [],
    // addModalVisible: false,
    // addFormSubmit: false,
    // addFormData: {},
    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    attachInfoData: {},
    attachInfoModalVisible: false,
    bindStoreModalVisible:false,
    spinLoading: false,
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    mainInf:{},
    extraInfs:[],
    soId:'',
    braId:''
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
    * doBindStore({ payload }, { call, put }){
      yield put({
        type: 'updateState',
        payload: { bindStoreModalVisible:false },
      });
      const res = yield call(service.bindStore, { 
          ...payload
      });
      const detail = parseResponse(res);
      if (detail.rspCod === '000000') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
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
      yield put(tableLoadFinOpt);
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
    * queryAttach({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      const res = yield call(commonService.queryAttach, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { attachInfoData: detail.rspData, spinLoading: false },
        });
      }
    },
    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
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
    * bindStore({ payload }, { call, put }) {
      // 打开 modal 页面 以及请求数据  bug
      // console.log('in manager',payload)
      const { braId } = payload;
      const {braName,merName} = payload.data;
      yield put({
        type: 'toggleModal',
        payload: { ...payload }
      })
      yield put({
        type: 'updateState',
        payload: { braName, merName, braId },
      });
/*    废弃代码
      // getSmartPOSList
      // console.log(service.getSmartPOSList)
      const res2 = yield call(service.getSmartPOSList);
      const result2 = parseResponse(res2);
      if (result2.rspCod === '200') {
        // console.log(result2);
        yield put({
          type: 'updateState',
          payload: { POSList:result2.rspList },
        });
        // callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
      // getCajasList
      const res3 = yield call(service.getCajasList);
      const result3 = parseResponse(res3);
      if (result3.rspCod === '200') {
        // console.log(result3);
        yield put({
          type: 'updateState',
          payload: { cajasList:result3.rspList },
        });
        // callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
*/
      // console.log('res1 res1 res1',result1);
      // const mainInf= {
      //   bindId:'3',
      //   pakName:'领袖套餐',
      //   pakYear:'3',
      //   termType:'01:03' // 不是 99 的保留   //01 支付设备 //02 03 pos
      // }
      // const extraInfs = [
      //   {
      //     bindId:'5',
      //     pakName:'会员服务1',
      //     pakYear:'1',
      //     termType:'01:99'
      //   },
      //   {
      //     bindId:'4',
      //     pakName:'会员服务2',
      //     pakYear:'2',
      //     termType:'99:99'
      //   }
      // ]
      // const soId = '1';
      // yield put({
      //   type: 'updateState',
      //   payload: { mainInf,extraInfs,soId },
      // });
      const res1 = yield call(service.bindList, { braId });
      const result1 = parseResponse(res1);

      if('rspCod' in result1){
        const code = result1.rspCod;  
        switch(code){
          case '000000': {
            if('rspData' in result1 && result1.rspData){
              const mainInf = result1.rspData.mainInf?result1.rspData.mainInf:{};
              const extraInfs = result1.rspData.extraInfs?result1.rspData.extraInfs:[];

              const paramsArr = mainInf.termType.split(':');
          
              const mainMealCajasList = yield call(service.getCajasList,{ terTyp: paramsArr[0] });

              mainInf.__cajasList = parseResponse(mainMealCajasList).rspList;

              const mainMealSmartPOSList = yield call(service.getSmartPOSList,{ terTyp: paramsArr[1] });
              
              mainInf.__smartPOSList = parseResponse(mainMealSmartPOSList).rspList;

              for( let item of extraInfs  ){

                const paramsArr = item.termType.split(':');

                const itemCajasList = yield call(service.getCajasList,{ terTyp: paramsArr[0] });
  
                item.__cajasList = parseResponse(itemCajasList).rspList;
                
                const itemSmartPOSList = yield call(service.getSmartPOSList,{ terTyp: paramsArr[1] });
                
                item.__smartPOSList = parseResponse(itemSmartPOSList).rspList;
  
              }
      // const soId = '1';
      // yield put({
      //   type: 'updateState',
      //   payload: { mainInf,extraInfs,soId },
      // });

              const soId = result1.rspData.soId;
              yield put({
                type: 'updateState',
                payload: { mainInf,extraInfs,soId },
              });
            }
            break;
          }
          default : callNotice(commonMap.fail, result1.rspMsg || commonMap.failInfo, 'error'); break;
        }
      }
    }
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        // case 'add':
        //   newState = { ...state, addModalVisible: !state.addModalVisible };
        //   break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'attachInfo':
          newState = { ...state, attachInfoData: action.payload.data, attachInfoModalVisible: !state.attachInfoModalVisible };
          break;
        case 'bindStore':
          newState = { ...state, attachInfoData: action.payload.data, merId:action.payload.data.merId, bindStoreModalVisible: !state.bindStoreModalVisible }
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
    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */
    updateStatusSuccess(state, action) {
      const ids = action.payload.ids;
      const status = action.payload.braStatus;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, braStatus: status };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },
  },
};
