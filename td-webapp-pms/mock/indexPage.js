const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

module.exports = {
  'GET /rest/bas/user/menus'(req, res) {
    const pmsMenu1 = [{
      key: '103-01',
      icon: 'folder-add',
      text: '渠道信息添加',
      children: [
        { key: '103-01-01', text: '刷卡渠道添加', to: 'pms/channelApply/channelBankcardApply' },
        { key: '103-01-02', text: '扫码渠道添加', to: 'pms/channelApply/channelScancodeApply' },
        { key: '103-01-03', text: '划款渠道添加', to: 'pms/channelApply/channelTransferApply' },
      ],
    }]
    const pmsMenu2 = [{
      key: '103-02',
      icon: 'folder-open',
      text: '渠道信息管理',
      children: [
        { key: '103-02-01', text: '刷卡渠道信息管理', to: 'pms/channelManage/channelBankcardManage' },
        { key: '103-02-02', text: '扫码渠道信息管理', to: 'pms/channelManage/channelScancodeManage' },
        { key: '103-02-03', text: '划款渠道信息管理', to: 'pms/channelManage/channelTransferManage' },
      ],
    }]
    const pmsMenu3 = [{
      key: '103-03',
      icon: 'file-add',
      text: '渠道商终信息添加',
      children: [
        { key: '103-03-01', text: '刷卡渠道商终添加', to: 'pms/merchantApply/merchantBankcardApply' },
        { key: '103-03-02', text: '扫码渠道商户添加', to: 'pms/merchantApply/merchantScancodeApply' },
      ],
    }]
    const pmsMenu4 = [{
      key: '103-04',
      icon: 'file',
      text: '渠道商终信息管理',
      children: [
        { key: '103-04-01', text: '刷卡渠道商户管理', to: 'pms/merchantManage/merchantBankcardManage' },
        { key: '103-04-02', text: '扫码渠道商户管理', to: 'pms/merchantManage/merchantScancodeManage' },
        { key: '103-04-03', text: '刷卡渠道终端管理', to: 'pms/terminalManage/terminalBankcardManage' },
      ],
    }]
    const pmsMenu5 = [{
      key: '103-05',
      icon: 'global',
      text: '路由信息配置',
      children: [
        { key: '103-05-01', text: '刷卡渠道路由模板', to: 'pms/routerManage/routerBankcardModManage' },
        { key: '103-05-02', text: '扫码渠道路由模板', to: 'pms/routerManage/routerScancodeModManage' },
        { key: '103-05-03', text: '刷卡商户路由配置', to: 'pms/routerManage/routerMerBankcardManage' },
        { key: '103-05-04', text: '扫码商户路由配置', to: 'pms/routerManage/routerMerScancodeManage' },
      ],
    }]
    // build menus like [].concat(xxxx, xxxx);
    const pmsMenus = [].concat(pmsMenu1, pmsMenu2, pmsMenu3, pmsMenu4, pmsMenu5);
    const menus = [].concat(pmsMenus);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        usrLoginAuthList: menus,
      },
    });
    res.json(data);
  },

  'GET /auth/mock/login.do'(req, res) {
    console.log('request param =>', req.query.usrPsw);
    const pwd = req.query.usrPsw;
    const data = {
      rspCod: '300',
      rspMsg: '密码错误',
    };
    // password 111111
    if (pwd === '96e79218965eb72c92a549dd5a330112') {
      const token = genToken();
      console.log('token =>', token);
      data.rspCod = '000000';
      data.rspMsg = '登录成功';
      data.rspData = { token: token };
    }
    const result = mockjs.mock(data);
    res.json(result);
  },
}
