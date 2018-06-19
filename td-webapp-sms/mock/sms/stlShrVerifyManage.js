const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/stlshr/verifys'(req, res) {
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
        clrTyp: '02',
        pyeMemId: `0000000000000000000000${i}`,
        pyeMemName: `分润商户-${i}`,
        shrDat: '20170517',
        ccy: 'CNY',
        txnTotCnt: '99',
        txnTotAmt: '99999999',
        txtTotFee: '9999',
        shrRatio: '10',
        fstShrCost: '1',
        fstShrPrin: '99',
        shrAmt: '888888',
        shrWay: '0',
        shrSts: '1',
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

  'GET /rest/sms/stlshr/verify/1'(req, res) {
    const dat = {
      id: '000000000000001',
      clrTyp: '02',
      pyeMemId: '0000000000000000000000',
      pyeMemName: '分润商户',
      shrDat: '20170517',
      ccy: 'CNY',
      txnTotCnt: '99',
      txnTotAmt: '99999999',
      txtTotFee: '9999',
      shrRatio: '10',
      fstShrCost: '1',
      fstShrPrin: '99',
      shrAmt: '888888',
      shrWay: '0',
      shrSts: '0',
      fstShrTyp: '0',
    }
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },

  'GET /rest/sms/stlshr/verifys/transactions'(req, res) {
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
        clrTyp: '02',
        pyeMemId: `0000000000000000000000${i}`,
        pyeMemName: `分润商户-${i}`,
        shrDat: '20170517',
        ccy: 'CNY',
        txnTotCnt: '99',
        txnTotAmt: '99999999',
        txtTotFee: '9999',
        shrRatio: '10',
        fstShrCost: '1',
        fstShrPrin: '99',
        shrAmt: '888888',
        shrWay: '0',
        shrSts: '0',
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
};
