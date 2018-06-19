const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/rms/termLimits'(req, res) {
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
      let ccy = 'CNY';
      switch (i % 2) {
        case 0: ccy = 'CNY'; break;
        case 1: ccy = 'CAD'; break;
        default : ccy = 'CNY'; break;
      }
      list.push({
        terId: `052120198814978580${currentPage}${i}`,
        limitStatus: '1',
        terOneLimitAmt: `10${i}`,
        terOneTopAmt: `10000${i}`,
        terDayTopAmt: `10000${i}`,
        terMonTopAmt: `10000${i}`,
        terDayTopCount: `${i}`,
        terMonTopCount: `100${i}`,
        addTim: `20170317164040${currentPage}${i}`,
        updTim: `20170311161010${currentPage}${i}`,
        operId: `jewel-${currentPage}${i}`,
        ccy: ccy,
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
  'POST /rest/rms/termLimit'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/rms/termLimits/delete'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/rms/termLimits/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/rms/termLimit/05212019881497858010'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
