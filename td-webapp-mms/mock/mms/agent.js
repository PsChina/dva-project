const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

        // gender: (i % 2 === 0 ? '0' : '1'),
        // birthday: `198${i}-01-09`,
        // certificateType: '01',
        // certificateNo: `42000000000000${i}`,
        // address: `xxx市xxx区xxx镇xxx路${i}号`,
module.exports = {
  'GET /rest/mms/agents'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 26;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        agtId: `${currentPage}${i}`,
        agtName: `user${currentPage}-${i}`,
        agtScope: (i % 2 === 0 ? '01' : '02'),
        bizSale: `王小明${i}`,
        agtStatus: (i % 2 === 0 ? '0' : '1'),
        agtType: (i % 2 === 0 ? '0' : '1'),
        addTim: '2017-03-01',
        agtLv: '高级',
        agtParentName: `代理商${i}`,
        cusId: `9199333${i}`,
        accKind: `1817366${i}`,
        accBal: `217${i}元`,
        ccy: '人民币',
        accSts: (i % 2 === 0 ? '0' : '1'),
        lstTxnTim: '2017-03-01 12:12:12',
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
  'GET /rest/mms/agent/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/mms/agent/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/mms/agent'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/mms/agents'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
