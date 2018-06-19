const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/channel/error/audits'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        chnId: `${i}`,
        chnName: `中国银联${currentPage}-${i}`,
        payChnLog1: '1212121',
        txnStatus: '0',
        chnPayAmt: '1212',
        chnBuzType: '1000',
        chkDat: '2017-4-27',
        txnId: `${i}`,
        ttxnId: `${i}`,
        tmerNo: `${i}`,
        ttermNo: `${i}`,
        txnDate: '20170510',
        txnTime: '184312',
        ccyCod: 'CNY',
        txnAmt: '0',
        ttxnAmt: '0',
        seqNo: `${i}`,
        batNo: `${i}`,
        autCod: `${i}`,
        txnType: 'S',
        chnChkSts: '02',
        dealSts: '00',
        dealId: `${i}`,
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

  'PUT /rest/sms/channel/error/audit/0'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '审核通过',
    });
    res.json(data);
  },

  'GET /rest/sms/channel/error/audit/0'(req, res) {
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        dealType: '01',
        auditRemark: '测试',
        auditObj: 'hy',
        auditTime: `201705261${i}3000`,
      });
    }
    console.log('request param errorAudit =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspList: list,
    });
    res.json(data);
  },

  'GET /rest/sms/channel/errorAudit/queryAuditHis/1'(req, res) {
    const dat = {
      payChnLog: `${1}`,
      txnNo: `${1}`,
      chnId: `${1}`,
      chnName: `中国银联${1}-${1}`,
      chkDat: '2017-4-27',
      ccyCod: 'CNY',
      txnAmt: '0',
    }
    console.log('request param queryAuditHis =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },

};

