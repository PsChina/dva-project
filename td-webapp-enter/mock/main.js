const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

module.exports = {
  'GET /rest/bas/user/systems'(req, res) {
    console.log('params =>', req.query)
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        menuItems: [
          { title: 'Finder' }, { title: 'Appstore' }, { title: 'Mail' },
          { title: 'Safari' }, { title: 'FaceTime' }, { title: 'AddressBook' },
          { title: 'iCalendar' }, { title: 'iTunes' }, { title: 'PhotoBooth' }, { title: 'iPhoto' }, { title: 'LoginOut' }, { title: 'UpdatePsw' },
        ],
        list: [
          { sysName: '运营管理平台', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '预警监控平台', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '平台1', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '平台2', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '平台3', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '平台4', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '平台5', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '平台6', icon: 'appstore', url: 'http://127.0.0.1:8989' },
          { sysName: '平台7', icon: 'appstore', url: 'http://127.0.0.1:8989' },
        ],
      },
    });
    res.json(data);
  },

  'GET /rest/bas/user/loginOut'(req, res) {
    console.log('request param =>');
    const data = {
      rspCod: '300',
      rspMsg: '用户名或密码错误',
    };

    const token = genToken();
    console.log('token =>', token);
    data.rspCod = '200';
    data.rspMsg = '登出c功';
    data.rspData = { token: token };
    const result = mockjs.mock(data);
    res.json(result);
  },

  'PUT /rest/bas/user/updatePsw'(req, res) {
    console.log('request param =>');
    const data = {
      rspCod: '300',
      rspMsg: '用户名或密码错误',
    };

    const token = genToken();
    console.log('token =>', token);
    data.rspCod = '200';
    data.rspMsg = '修改成功，请重新登录';
    data.rspData = { token: token };
    const result = mockjs.mock(data);
    res.json(result);
  },
};
