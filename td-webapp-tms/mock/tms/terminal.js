const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/terminals'(req, res) {
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
        terId: `${currentPage}${i}`,
        terPhyno: `phy${i}`,
        terNo: `terno${i}`,
        terTyp: '1',
        terStatue: '1',
        terBraId: 'bra111',
        braName: `门店${i}`,
        terMerId: 'mer222',
        merName: `商户${i}`,
        terAgtId: 'agt333',
        agtName: `代理商${i}`,
        addDat: '20170321',
        outDat: '20170321151012',
        copNam: '百富',
        terModNo: 's007',
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

  'GET /rest/tms/terminal/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/terminals/stats'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/terminal/queryAuth'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const rspData = {};
    rspData.fPospayTxnSup = '111111111111111';
    rspData.pospayTxnSup = '111111111111111';
    rspData.bankCardSup = '1';
    rspData.terId = '10';
    const data = mockjs.mock({
      rspData: rspData,
      rspCod: '200',
      rspMsg: '查询成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/terminal/auth'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

};
