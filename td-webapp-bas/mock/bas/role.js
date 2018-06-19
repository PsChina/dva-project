const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/roles'(req, res) {
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
        roleId: `00${i}${i}${i}${i}${i}${i}${i}`,
        roleName: `收单业务员${i}`,
        isUse: `${i % 2 === 0 ? '1' : '0'}`,
        sysId: '011',
        roleDesc: `undertaker${currentPage}@16${i}.com`,
        creObjName: `Jewel${i}`,
        creTim: `2017-03-17 16：40：40${currentPage}${i}`,
        updObjName: `hello${currentPage}${i}`,
        updTim: `2017-03-11 16：10：10${currentPage}${i}`,
        failLoginTimes: `${i % 2 === 0 ? '0' : i}`,
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
  'POST /rest/bas/role'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/roles'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/roles/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/role'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'GET /rest/bas/role/queryRoleMenuInfo'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const i = 1;
    const list = {
      roleId: `00${i}${i}${i}${i}${i}${i}${i}`,
      roleName: `收单业务员${i}`,
      isUse: `${i % 2 === 0 ? '1' : '0'}`,
      sysId: '011',
      roleDesc: `undertaker${currentPage}@16${i}.com`,
      creObjName: `Jewel${i}`,
      creTim: `2017-03-17 16：40：40${currentPage}${i}`,
      updObjName: `hello${currentPage}${i}`,
      updTim: `2017-03-11 16：10：10${currentPage}${i}`,
      failLoginTimes: `${i % 2 === 0 ? '0' : i}`,
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
};
