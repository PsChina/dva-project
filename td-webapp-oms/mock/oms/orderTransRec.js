const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');


module.exports = {
  'GET /rest/oms/order/orderTransRecs'(req, res) {
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
        recId: `${currentPage}${i}`,
        txnNo: `${currentPage}${i}`,
        seqNo: `seq${i}`,
        merNo: `merNo${i}`,
        merId: `merId${i}`,
        terNo: `v${i}`,
        merName: `商户${i}`,
        braName: `门店${i}`,
        agtName: `代理商${i}`,
        txnAmt: '1000',
        currency: '人民币',
        txnType: 'S',
        txnTime: '20170316142525',
        txnRate: '0.1',
        chnFeeLim: '100',
        txnFee: '20',
        cardNo: '6228483030*****3313',
        cardType: '01',
        cardIssinam: '农业银行',
        tseqNo: '000012300',
        tsrefno: '12312313',
        tautcod: '456456456',
        txnStatus: 'S',
        freezeStatus: '0',
        clearSts: '0',
        chnName: '银联',
        otxnNo: '34',
        status: '0',
        validDate: '20121212085226',
        operTim: '20121212085226',
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
  'PUT /rest/oms/order/orderTransRec/10'(req, res) {
    // 获取请求参数
    const recordList = [];
    const record = {};
    record.recId = '10';
    record.txnNo = '10';
    record.seqNo = 'seq0';
    record.merNo = 'merNo0';
    record.merId = 'merId0';
    record.terNo = 'v0';
    record.merName = '商户0';
    record.braName = '门店0';
    record.agtName = '代理商00';
    record.txnAmt = '1000';
    record.currency = '人民币';
    record.txnType = 'S';
    record.txnTime = '20170316142525';
    record.txnRate = '0.1';
    record.chnFeeLim = '100';
    record.txnFee = '20';
    record.cardNo = '6228483030*****3313';
    record.cardType = '01';
    record.cardIssinam = '农业银行';
    record.tseqNo = '000012300';
    record.tsrefno = '12312313';
    record.tautcod = '456456456';
    record.txnStatus = 'S';
    record.freezeStatus = '0';
    record.clearSts = '0';
    record.chnName = '银联';
    record.otxnNo = '34';
    record.status = '0';
    record.validDate = '20121212085226';
    record.operTim = '20121212085226';
    recordList[0] = record;
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: { DATA: recordList },
    });
    res.json(data);
  },
  'PUT /rest/oms/order/orderTransRec/handle'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },


};
