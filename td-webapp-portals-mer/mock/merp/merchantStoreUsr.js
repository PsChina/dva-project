const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/merp/store/users'(req, res) {
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
        usrId: `${currentPage}${i}`,
        merId: `${currentPage}${i}`,
        merName: `Coala${currentPage}`,
        braId: `braId${currentPage}`,
        braName: `braName${i + 2}`,
        braUser: `jewel-${i}`,
        braRole: `${i % 2 === 0 ? '1' : '0'}`,
        braUserName: `usrRealName${currentPage}-${i}`,
        usrEmail: `9122@22${currentPage}-${i}`,
        usrMobile: `1312222222${i}`,
        usrDesc: '该用户表现很出色',
        usrStatus: (i % 2 === 0 ? '0' : '1'),
        isLock: (i % 2 === 0 ? '0' : '1'),
        creTim: '2017-03-01 11：11：22',
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
  'DELETE /rest/merp/merchantStore/users'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
      rspData: {},
    });
    res.json(data);
  },

  'GET /rest/merp/merchantStore/role/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'POST /rest/merp/merchantStore/user'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/merp/merchantStore/users/Status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'PUT /rest/merp/merchantStore/user/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/merp/merchantStore/users'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
};
