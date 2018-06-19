const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');


module.exports = {
  'GET /rest/agtp/order/scanOrders'(req, res) {
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
        terNo: `v${i}`,
        merNo: `merNo${i}`,
        merName: `商户${i}`,
        braName: `门店${i}`,
        agtName: `代理商${i}`,
        txnAmt: '2000',
        currency: '人民币',
        txnTime: '20170316142525',
        txnType: 'S',
        scanType: '1',
        chnName: '微信',
        txnFee: '20',
        chnFeeLim: '200',
        buyerAccount: '456456456',
        chnMerId: '000012300',
        tautcod: '456456456',
        txnStatus: 'S',
        txnRate: '0.1',
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
  'PUT /rest/agtp/order/scanOrder/10'(req, res) {
    // 获取请求参数
    const recordList = [];
    const record = {};
    record.txnNo = '10';
    record.terNo = 'v10';
    record.merName = '商户10';
    record.braName = '门店10';
    record.agtName = '代理商10';
    record.txnAmt = '2000';
    record.currency = '人民币';
    record.txnType = 'S';
    record.txnTime = '20170316142525';
    record.txnRate = '0.1';
    record.chnFeeLim = '100';
    record.txnFee = '20';
    record.cardNo = '6228483030*****3313';
    record.cardType = '01';
    record.cardIssinma = '农业银行';
    record.tseqNo = '000012300';
    record.tsrefno = '12312313';
    record.tautcod = '456456456';
    record.txnStatus = 'S';
    record.freezeStatus = '0';
    record.clearSts = '0';
    record.chnName = '银联';
    record.chnMerId = '000012300';
    record.scanType = '1';
    record.buyerAccount = '456456456';
    recordList[0] = record;
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: { DATA: recordList },
    });
    res.json(data);
  },
  'GET /rest/agtp/order/scanOrders/export'(req, res) {
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
