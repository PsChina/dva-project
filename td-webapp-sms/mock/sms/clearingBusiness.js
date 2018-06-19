const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/clearBusiness/doubts'(req, res) {
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
        clrTyp: '03',
        busiTyp: '01',
        pyeMemId: `000000000000000000${currentPage}-${i}`,
        pyeMemName: `收款方名称${currentPage}-${i}`,
        ccyCod: 'CNY',
        clrDat: '2017-05-04',
        txnTotCnt: '10',
        txnTotAmt: '1000',
        txnTolFee: '100',
        payTotCnt: '10',
        payTotAmt: '1000',
        payTolFee: '100',
        refTotCnt: '10',
        refTotAmt: '1000',
        refTolFee: '100',
        chnFeeTot: '1',
        agtId: '',
        shrAmt: '10',
        stlDat: '2017-05-04',
        stlSts: '0',
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

  'GET /rest/sms/clearBusiness/doubt'(req, res) {
    const dat = {
      clrTyp: '02',
      busiTyp: '01',
      pyeMemId: '000000000000000000',
      pyeMemName: '收款方名称',
      ccyCod: 'CNY',
      clrDat: '2017-05-04',
      txnTotCnt: '10',
      txnTotAmt: '1000',
      txnTolFee: '100',
      payTotCnt: '10',
      payTotAmt: '1000',
      payTolFee: '100',
      refTotCnt: '10',
      refTotAmt: '1000',
      refTolFee: '100',
      chnFeeTot: '1',
      agtId: '',
      shrAmt: '10',
      stlDat: '2017-05-04',
      stlSts: '0',
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },
  'GET /rest/sms/clearBusiness/doubt/batchOutAmt'(req, res) {
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
};
