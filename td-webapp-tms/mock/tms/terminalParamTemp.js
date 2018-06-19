const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/paramTemps'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const total = 3;
    const list = [];
    for (let i = 0; i < 3; i++) {
      list.push({
        tempId: `TMP00${i + 1}`,
        tempName: `测试模版${i + 1}`,
        tempType: `${i % 2 === 0 ? '01' : '02'}`,
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

  'GET /rest/tms/paramTemps/select'(req, res) {
    // 获取请求参数
    // const param = qs.parse(Base64.atob(req.query.p));
    // console.log('request param =>', param);
    const list = [];
    for (let i = 0; i < 3; i++) {
      list.push({
        value: `TMP00${i + 1}`,
        text: `测试模版${i + 1}`,
        type: i % 2 === 0 ? '01' : '02',
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },

  'PUT /rest/tms/paramTemp/TMP001'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/tms/paramTemp'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/tms/paramTemp/TMP001'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
};
