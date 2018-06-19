const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');


module.exports = {
  'GET /rest/oms/order/summaryOrderHiss'(req, res) {
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
        txnNo: `${currentPage}${i}`,
        terNo: `v2${i}`,
        merName: `商户2${i}`,
        braName: `门店2${i}`,
        agtName: `代理商2${i}`,
        txnAmt: '2000',
        currency: '人民币',
        txnType: 'S',
        txnDate: '20170319',
        txnTime: '20170319142823',
        txnStatus: 'F',
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
  'GET /rest/oms/order/summaryOrderHiss/export'(req, res) {
     // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '导出成功',
      rspData: {},
    });
    res.json(data);
  },
};
