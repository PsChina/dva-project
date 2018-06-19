const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

module.exports = {
  'GET /rest/agtp/user/menus'(req, res) {
    const mmsMenus = [
      {
        key: '100',
        icon: 'team',
        text: '会员管理',
        children: [
          { key: '100-01', text: '个人会员管理', to: 'mms/memberManage/personalMemberManage' },
          { key: '100-02', text: '企业商户管理', to: 'mms/memberManage/merchantManage' },
          { key: '100-03', text: '商户门店管理', to: 'mms/memberManage/merchantStoreManage' },
          { key: '100-04', text: '代理商管理', to: 'mms/memberManage/agentManage' },
          { key: '100-05', text: '服务商管理', to: '#' },
        ],
      },
      {
        key: '101',
        icon: 'solution',
        text: '会员申请',
        children: [
          { key: '101-01', text: '个人会员申请', to: 'mms/memberApply/personalMemberApply' },
          { key: '101-02', text: '企业商户申请', to: 'mms/memberApply/merchantApply' },
          { key: '101-03', text: '商户门店申请', to: 'mms/memberApply/merchantStoreApply' },
          { key: '101-04', text: '代理商申请', to: 'mms/memberApply/agentApply' },
          { key: '101-05', text: '服务商申请', to: '#' },
        ],
      },
      {
        key: '102',
        icon: 'user',
        text: '会员角色管理',
        children: [
          { key: '102-01', text: '商户角色管理', to: 'mms/memberRoleManage/merchantRoleManage' },
          { key: '102-02', text: '门店角色管理', to: '#' },
          { key: '102-03', text: '代理商角色管理', to: 'mms/memberRoleManage/agentRoleManage' },
          { key: '102-04', text: '服务商角色管理', to: '#' },
        ],
      },
      {
        key: '103',
        icon: 'solution',
        text: '会员用户管理',
        children: [
          { key: '103-01', text: '商户用户管理', to: 'mms/memberUserManage/merchantUsrManage' },
          { key: '103-02', text: '门店人员管理', to: '#' },
          { key: '103-03', text: '代理商用户管理', to: 'mms/memberUserManage/agentUsrManage' },
          { key: '103-04', text: '服务商用户管理', to: '#' },
        ],
      },
      {
        key: '104',
        icon: 'laptop',
        text: '产品',
        children: [
          { key: '104-01', text: '产品管理', to: 'product/manage' },
        ],
      },
      {
        key: '105',
        icon: 'laptop',
        text: '任务管理',
        children: [
          { key: '105-01', text: '我的申请', to: '#' },
          { key: '105-02', text: '我的代办', to: 'mms/taskManage/taskTodoManage' },
          { key: '105-03', text: '我的已办', to: '#' },
        ],
      },
    ];
    const menus = [].concat(mmsMenus);
    const data = mockjs.mock({
      rspCod: '000000',
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
