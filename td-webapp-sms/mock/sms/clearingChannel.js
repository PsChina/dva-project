const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/clearChannel/doubts'(req, res) {
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
  'GET /rest/sms/channel/clearings/transaction/0'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        orderId: `${i}`,
        commodityDetail: '交易明细-鲜花',
        ccyCod: 'CNY',
        transactionType: '交易类型',
        txnAmt: '1000',
        txnFee: '100',
        orderCreateDate: '2017-05-15',
        orderPayDate: '2017-05-15',
        buyUserLogin: '131111111111',
        buyUserType: '01',
        buyUserName: '买方',
        sellUserLogin: '13333333333333',
        sellUserType: '01',
        sellUserName: '卖方',
        guatanteePayLogo: '0',
        orderStatus: '0',
        clrDat: '2017-05-15',
        coreAccountDate: '2017-05-15',
        coreAccountNumber: `0000000000000000000000${i}`,
        coreAccountStatus: '0',
        coreChkStatus: '0',
        channelAccountDate: '2017-05-15',
        channelAccountTime: '13:13',
        channelNumber: `0000000000000000000000${i}`,
        channelAccountStatus: '0',
        channelChkStatus: '0',
        remark: '这是测试数据',
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

  'GET /rest/sms/channel/clearing/0'(req, res) {
    const dat = {
      clrTyp: '02',
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
};
