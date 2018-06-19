const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

module.exports = {
  'GET /merp/rest/user/menus'(req, res) {
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
      {
        key: '4',
        text: '商户服务',
        to: 'merp/service/MerInf',
        children: [
          { key: '40', text: '商户信息', to: 'merp/service/MerInf' },
          { key: '41', text: '修改密码', to: 'merp/service/PwdService' },
          { key: '42', text: '消息通知', to: '' },
        ],
      },
    ];
    const menus = [].concat(merpMenus);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        usrLoginAuthList: menus,
      },
    });
    res.json(data);
  },
}
