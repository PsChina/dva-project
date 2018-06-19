const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/rms/storeLimits'(req, res) {
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
        case 1: ccy = 'THB'; break;
        default : ccy = 'CNY'; break;
      }
      list.push({
        braId: `020000000000001000${currentPage}${i}`,
        limitStatus: '1',
        braOneLimitAmt: `10${i}`,
        braOneTopAmt: `10000${i}`,
        braDayTopAmt: `10000${i}`,
        braMonTopAmt: `10000${i}`,
        braDayTopCount: `${i}`,
        braMonTopCount: `100${i}`,
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
  'POST /rest/rms/storeLimit'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/rms/storeLimits/delete'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/rms/storeLimits/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/rms/storeLimit/02000000000000100010'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
