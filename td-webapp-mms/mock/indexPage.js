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
    const mmsMenus = [
      {
        key: '101-01',
        icon: 'team',
        text: '会员管理',
        children: [
          { key: '101-01-01', text: '个人会员管理', to: 'mms/memberManage/personalMemberManage' },
          { key: '101-01-02', text: '企业商户管理', to: 'mms/memberManage/merchantManage' },
          { key: '101-01-03', text: '商户门店管理', to: 'mms/memberManage/merchantStoreManage' },
          { key: '101-01-04', text: '代理商管理', to: 'mms/memberManage/agentManage' },
          { key: '101-01-05', text: '服务商管理', to: '#' },
        ],
      },
      {
        key: '101-02',
        icon: 'solution',
        text: '会员申请',
        children: [
          { key: '101-02-01', text: '个人会员申请', to: 'mms/memberApply/personalMemberApply' },
          { key: '101-02-02', text: '企业商户申请', to: 'mms/memberApply/merchantApply' },
          { key: '101-02-03', text: '商户门店申请', to: 'mms/memberApply/merchantStoreApply' },
          { key: '101-02-04', text: '代理商申请', to: 'mms/memberApply/agentApply' },
          { key: '101-02-05', text: '服务商申请', to: '#' },
          { key: '101-02-06', text: '企业商户申请（国际版）', to: 'mms/memberApply/merchantGlobalApply'},
        ],
      },
      {
        key: '101-03',
        icon: 'user',
        text: '会员角色管理',
        children: [
          { key: '101-03-01', text: '商户角色管理', to: 'mms/memberRoleManage/merchantRoleManage' },
          { key: '101-03-02', text: '门店角色管理', to: '#' },
          { key: '101-03-03', text: '代理商角色管理', to: 'mms/memberRoleManage/agentRoleManage' },
          { key: '101-03-04', text: '服务商角色管理', to: '#' },
        ],
      },
      {
        key: '101-04',
        icon: 'solution',
        text: '会员用户管理',
        children: [
          { key: '101-04-01', text: '商户用户管理', to: 'mms/memberUserManage/merchantUsrManage' },
          { key: '101-04-02', text: '门店人员管理', to: '#' },
          { key: '101-04-03', text: '代理商用户管理', to: 'mms/memberUserManage/agentUsrManage' },
          { key: '101-04-04', text: '服务商用户管理', to: '#' },
        ],
      },
      {
        key: '101-05',
        icon: 'laptop',
        text: '产品',
        children: [
          { key: '101-05-01', text: '产品管理', to: 'product/manage' },
        ],
      },
    ];
    const menus = [].concat(mmsMenus);
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
