const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/users'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        usrId: `00${i}${i}${i}${i}${i}${i}${i}`,
        usrName: `jewel_${i}`,
        usrRealName: `葛二蛋${i}`,
        orgName: `运营管理${i}部`,
        usrEmail: `undertaker${currentPage}@16${i}.com`,
        usrDesc: `红红火火恍恍惚惚${currentPage}${i}`,
        usrMobile: `13959934${currentPage}${i}`,
        usrStatus: `${i % 2 === 0 ? '1' : '0'}`,
        lastLoginTime: `2017-03-17 16：40：40${currentPage}${i}`,
        creTim: `2017-03-11 16：10：10${currentPage}${i}`,
        updTim: `2017-03-17 16：10：10${currentPage}${i}`,
        failLoginTimes: `${i % 2 === 0 ? '0' : i}`,
        creObjName: `jewel-${currentPage}${i}`,
        updObjName: `jewels-${currentPage}${i}`,
        isLock: `${i % 2 === 0 ? '1' : '0'}`,
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'POST /rest/bas/user'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/users'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
      rspData: {},
    });
    res.json(data);
  },

  'PUT /rest/bas/users/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/user'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/user/reset'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '密码已重置成：td888888，请牢记',
    });
    res.json(data);
  },

  'PUT /rest/bas/user/unLock'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '用户已解锁',
    });
    res.json(data);
  },

  'GET /rest/pms/channel/transfer/10'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/pms/channel/transfer/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },


};
