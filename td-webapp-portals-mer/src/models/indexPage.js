import * as service from '../services/login';
import { parseResponse } from '../utils/request';
import { callNotice } from '../utils/alert';
import * as i18n from '../utils/i18n';
import Config from '../../config/config.json';
import { decode } from '../utils/code';
import { getCookie, getToken, setToken } from '../utils/storage';

const commonMap = i18n.commonMap();

/**
 * 通过递归方式构建面包屑导航数据
 * 菜单的key必须满足一定规则 如：
 * 1, 11, 12, 111, 112 或 1, 1-1, 1-2, 1-1-1, 1-1-2
 * 叶子菜单的key能够查找到父菜单的key，并且位置在第一位
 */
const buildBreadPath = (menuItems, key) => {
  let path = '';
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    if (key.indexOf(item.key) === 0) {
      path = item.text;
      if (item.children && item.children.length > 0) {
        const cPath = buildBreadPath(item.children, key);
        path += `,${cPath}`;
      }
    }
  }
  return path;
}

const merpMenus = [
  {
    key: '1',
    text: '首页',
    to: 'home',
    children: [
      { key: '10', text: '门店申请', to: 'merp/store/storeApply' },
      { key: '11', text: '门店查询', to: 'merp/store/storeManage' },
      { key: '12', text: '门店人员管理', to: 'merp/store/storeUsrManage' },
      { key: '13', text: '门店任务查询', to: 'merp/store/taskStoreManage' },
    ],
  },
  {
    key: '2',
    text: '终端信息',
    to: 'merp/terminalManage/merchantTerminalManage',
    children: [
      { key: '20', text: '终端查询', to: 'merp/terminalManage/merchantTerminalManage' },
    ],
  },
  {
    key: '3',
    text: '交易信息',
    to: 'merp/orderManage/summaryOrderManage',
    children: [
      { key: '30', text: '当日汇总交易', to: 'merp/orderManage/summaryOrderManage' },
      { key: '31', text: '历史汇总交易', to: 'merp/orderManage/summaryHisOrderManage' },
      { key: '32', text: '当日银行卡交易', to: 'merp/orderManage/bankcardOrderManage' },
      { key: '33', text: '历史银行卡交易', to: 'merp/orderManage/bankcardHisOrderManage' },
      { key: '34', text: '当日扫码交易', to: 'merp/orderManage/scanOrderManage' },
      { key: '35', text: '历史扫码交易', to: 'merp/orderManage/scanHisOrderManage' },
    ],
  },
  /*{
    key: '4',
    text: '结算信息',
    to: 'merp/stlManage/merStlManage',
    children: [
      { key: '40', text: '结算查询', to: 'merp/stlManage/merStlManage' },
      { key: '41', text: '结算提现', to: 'merp/stlManage/merStlWithdraw' },
    ],
  },*/
  {
    key: '5',
    text: '商户服务',
    to: 'merp/service/MerInf',
    children: [
      { key: '50', text: '商户详情', to: 'merp/service/MerInf' },
      { key: '51', text: '密码修改', to: 'merp/service/PwdService' },
    ],
  },
  /*{
    key: '6',
    text: '公告管理',
    to: 'merp/announcement/announcementManage',
    children: [
      { key: '60', text: '公告查询', to: 'merp/announcement/announcementManage' },
    ],
  },*/
];
/**
 * 解析token
 */
const parseToken = (url) => {
  const key = '?k=';
  const idx = url.indexOf(key);
  let param = null;
  if (idx !== -1) {
    let str = '';
    const nurl = url.substring(idx);
    const idx2 = nurl.indexOf('&');
    str = nurl.substring(key.length, idx2 === -1 ? url.length : idx2);
    param = (str !== '' ? decode(str, 'base64', true) : '');  // should url safe
    const p = (param !== '' ? qs.parse(param) : {});
    setToken(p.user, p.tk);
    return p;
  }
  return param;
}

export default {
  namespace: 'indexPage',
  state: {
    loginVisible: false,
    loginLoading: false,
    username: '',
    breadPath: [commonMap.home],
    menuItems: merpMenus,
    active: '0',
  },
  effects: {
    * logout({ payload }, { call, put }) {
      const param = parseToken(window.location.href);
      const username = (param === null ? getCookie(`${Config.app}_USR`) : param.user);
      const token = (param === null ? getToken(username) : param.tk);
      const res = yield call(service.logout, { ...payload, token });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload,
        });
        //window.location.href = Config.loginUrl;
        window.location.href = '/';
      } else {
        yield put({
          type: 'updateState',
          payload: { tk: null, loading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
        window.location.href = '/';
      }
    },
  },
  reducers: {
    // 公用状态更新方法 参数的属性和状态的属性一致即可
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    updateBreadPath(state, action) {
      const path = `${commonMap.home},${buildBreadPath(state.menuItems, action.payload.key.toString())}`;
      return { ...state, breadPath: path.split(',') };
    },
    updateNavHeader(state, action) {
      const active = action.payload.key;
      const navData = state.menuItems;
      let navSideData = [];
      let path = '';
      for (let i = 0; i < navData.length; i++) {
        if (navData[i].key === active) {
          navSideData = navData[i].children;
          path = navData[i].children[0].to;
        }
      }
      return { ...state, active: active, navSideData: navSideData, path: path };
    },
  },
}
