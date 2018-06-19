const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/platform/clearings'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        id: `0000000000000001${i}`,
        clrTyp: "02",
        pyeMemId: "0000000000000001",
        pyeMemName: "收款方",
        clrDat: "20170516",
        txnTotCnt: "99",
        txnTotAmt: "9900000",
        txnTotFee: "9999",
        payTotCnt: "99",
        payTotAmt: "9900000",
        payTotFee: "9999",
        refTotCnt: "0",
        refTotAmt: "0",
        refTotFee: "0",
        agtId: "",
        agtName: "",
        shrAmt: null,
        ccy: "CNY",
        stlDat: "",
        stlSts: "0",
        children: [
          {
            id: `0000000000000001${i}1`,
            ccy: "CNY",
            pyeMemId: `0000000000000001${i}1 `,
            clrTyp: "02",
            busiTyp: "01",
            payTotAmt: "9900000",
            refTotAmt: "0",
            payTotFee: "9999",
            shrAmt: null,
            txnTotCnt: "99",
            payTotCnt: "99",
            txnTotAmt: "9900000",
            pyeMemName: "收款方",
            agtId: "",
            txnTotFee: "9999",
            agtName: "",
            refTotFee: "0",
            clrDat: "20170516",
            refTotCnt: "0",
            stlSts: "0",
            stlDat: "",
          },
          {
            id: `0000000000000001${i}2`,
            ccy: "CNY",
            pyeMemId: `0000000000000001${i}1 `,
            clrTyp: "02",
            busiTyp: "02",
            payTotAmt: "9900000",
            refTotAmt: "0",
            payTotFee: "9999",
            shrAmt: null,
            txnTotCnt: "99",
            payTotCnt: "99",
            txnTotAmt: "9900000",
            pyeMemName: "收款方",
            agtId: "",
            txnTotFee: "9999",
            agtName: "",
            refTotFee: "0",
            clrDat: "20170516",
            refTotCnt: "0",
            stlSts: "0",
            stlDat: "",
          },
          {
            id: `0000000000000001${i}3`,
            ccy: "CNY",
            pyeMemId: `0000000000000001${i}1 `,
            clrTyp: "02",
            busiTyp: "03",
            payTotAmt: "9900000",
            refTotAmt: "0",
            payTotFee: "9999",
            shrAmt: null,
            txnTotCnt: "99",
            payTotCnt: "99",
            txnTotAmt: "9900000",
            pyeMemName: "收款方",
            agtId: "",
            txnTotFee: "9999",
            agtName: "",
            refTotFee: "0",
            clrDat: "20170516",
            refTotCnt: "0",
            stlSts: "0",
            stlDat: "",
          },
          {
            id: `0000000000000001${i}4`,
            ccy: "CNY",
            pyeMemId: `0000000000000001${i}1 `,
            clrTyp: "02",
            busiTyp: "04",
            payTotAmt: "9900000",
            refTotAmt: "0",
            payTotFee: "9999",
            shrAmt: null,
            txnTotCnt: "99",
            payTotCnt: "99",
            txnTotAmt: "9900000",
            pyeMemName: "收款方",
            agtId: "",
            txnTotFee: "9999",
            agtName: "",
            refTotFee: "0",
            clrDat: "20170516",
            refTotCnt: "0",
            stlSts: "0",
            stlDat: "",
          },
        ],
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

  'GET /rest/sms/platform/clearings/transaction/00000000000000010'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        orderId: `0000000000000001${i}`,
        commodityDetail: '交易明细-平台-鲜花',
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

  'GET /rest/sms/platform/clearing/00000000000000010'(req, res) {
    const dat = {
      id: `00000000000000010`,
      ccy: "CNY",
      pyeMemId: `000000000000000101 `,
      clrTyp: "02",
      busiTyp: "01",
      payTotAmt: "9900000",
      refTotAmt: "0",
      payTotFee: "9999",
      shrAmt: null,
      txnTotCnt: "99",
      payTotCnt: "99",
      txnTotAmt: "9900000",
      pyeMemName: "收款方",
      agtId: "",
      txnTotFee: "9999",
      agtName: "",
      refTotFee: "0",
      clrDat: "20170516",
      refTotCnt: "0",
      stlSts: "0",
      stlDat: "",
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },
};
