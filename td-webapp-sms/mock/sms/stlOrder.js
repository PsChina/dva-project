const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/stlOrder/doubts'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        id: `${i}`,
        stlWay: '01',
        ccyCod: 'CNY',
        clrTyp: '02',
        pyeMemName: `收款商户-${i}`,
        outAmt: '204501',
        outFee: '100',
        outDate: '2017-05-04',
        outBank: '10',
        outBankName: '人民银行',
        outAcc: `621483121276999${i}`,
        outAccName: '招商银行账户',
        coreAccSts: 'U',
        coreActDat: '02',
        coreJrnNo: '2017-05-04',
        outChnId: '00',
        outChnName: '00',
        outChnTim: '00',
        outChnJrnNo: '00',
        outSts: `${i % 2 === 0 ? 2 : 1}`,
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

  'GET /rest/sms/stlOrder/doubt'(req, res) {
    const dat = {
      id: '000000000000001',
      stlWay: '01',
      ccyCod: 'CNY',
      outAmt: '204501',
      outFee: '100',
      outDate: '2017-05-04',
      outBank: '10',
      outAcc: '1000',
      coreAccSts: 'U',
      coreActDat: '2017-05-04',
      coreJrnNo: '2017-05-04',
      outChnId: '000000000000001',
      outChnName: '渠道名称',
      outChnTim: '2017-05-04',
      outChnJrnNo: '000000000000001',
      outSts: '1',
    }
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },
  'GET /rest/sms/stlOrder/doubt/batchOutAmt'(req, res) {
    const dat = {
      payChnLog: `${1}`,
      txnNo: `${1}`,
      chnId: `${1}`,
      chnName: `中国银联${1}-${1}`,
      chkDat: '2017-4-27',
      ccyCod: 'CNY',
      txnAmt: '0',
    }
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '批量操作成功',
      rspData: dat,
    });
    res.json(data);
  },
  'GET /rest/sms/stlOrder/doubt/outAmt'(req, res) {
    const dat = {
      payChnLog: `${1}`,
      txnNo: `${1}`,
      chnId: `${1}`,
      chnName: `中国银联${1}-${1}`,
      chkDat: '2017-4-27',
      ccyCod: 'CNY',
      txnAmt: '0',
    }
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '操作成功',
      rspData: dat,
    });
    res.json(data);
  },
};
