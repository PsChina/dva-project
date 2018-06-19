const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/procedures'(req, res) {
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
        nodeno: `2017030200000002${i}`,
        nodename: `商户基础开户申请${i}`,
        modelno: `3333333000002${i}`,
        modelname: `账务调账_${i}`,
        nodetype: `0${i}`,
        systemno: '011',
        systemname: '系统名称',
        status: `${i % 2 === 0 ? '1' : '0'}`,
        positioncode: '0001',
        positionname: '申请岗',
        modeltype: `0${i}`,
        createobj: 'jewel',
        updateobj: 'john',
        createdate: '20170302173947',
        updatedate: '20170302173947',
        backfield1: '',
        backfield2: '',
        backfield3: '',
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
  'GET /rest/bas/procedure/20170302000000020'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const total = 22;
    const list = {
      processCfgList: [
        {
          nodename: '账务调账-申请岗',
          roleNames: '收单系统超级管理员',
          positionname: '申请岗',
        },
        {
          nodename: '账务调账-审核岗',
          roleNames: '收单系统超级管理员,收单业务员',
          positionname: '审核岗' }],
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },

  'POST /rest/bas/procedure'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/procedure'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/procedures/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/procedure/20170302000000020'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/procedure/'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

};
