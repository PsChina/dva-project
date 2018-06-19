import * as i18n from '../../utils/i18n';

// 基础配置信息
const namespace = 'businessOverview';
// 业务配置信息
const bizMap = i18n.bizMap('bms/business');
const offLineBiz = bizMap.allOfflineBiz !== '' ? bizMap.allOfflineBiz.split(',') : [];
const onLineBiz = bizMap.allOnlineBiz !== '' ? bizMap.allOnlineBiz.split(',') : [];
const realTimeStlBiz = bizMap.allRealTimeSettlementBiz !== '' ? bizMap.allRealTimeSettlementBiz.split(',') : [];
const buildAllBiz = (arr) => {
  const allBiz = [];
  for (let i = 0; i < arr.length; i++) {
    allBiz.push({ title: bizMap[arr[i]], biz: arr[i] });
  }
  return allBiz;
};
export default {
  namespace,
  state: {
    allOffLineBiz: buildAllBiz(offLineBiz),
    allOnLineBiz: buildAllBiz(onLineBiz),
    allRealTimeStlBiz: buildAllBiz(realTimeStlBiz),
  },
};
