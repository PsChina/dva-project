const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/manage/settles'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        ID: `${i + (currentPage * 10)}`,
        STL_DAT: '2017-4-27',
        STL_MOD: `${(currentPage === '3' ? '1' : currentPage - 1)}`,
        STL_TYP: `${currentPage - 1}`,
        CLR_TYP: `0${currentPage}`,
        PYE_MEM_ID: `0${currentPage}`,
        CCY: `${(i === 1 ? 'USD' : 'CNY')}`,
        STL_AMT: `${(i + 1) * 1000}`,
        STL_STS: null,
        BEG_CLR_DAT: '2017-4-21',
        END_CLR_DAT: '2017-4-26',
        STL_WAY_ACT: `${currentPage === '3' ? '1' : currentPage}`,
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

  'GET /rest/sms/manage/settle/1'(req, res) {
    const dat = {
      ID: `${1}`,
      STL_MOD: '正常结算',
      STL_TYP: '自然日结算',
      STL_WAY_ACT: '订单',
      CLR_TYP: '商户',
      PYE_MEM_ID: '0111',
      PYE_MEM_NAME: '商户',
      STL_DAT: '2017-05-05',
      BEG_CLR_DAT: '2017-04-06',
      END_CLR_DAT: '2017-05-04',
      CCY: '人民币',
      STL_AMT: '1000',
      STL_FEE: '1',
      STL_WAY: '银行账户',
      TXN_TOT_CNT: '100',
      TXN_TOT_AMT: '10000',
      TXN_TOT_FEE: '0',
      PAY_TOT_CNT: '50',
      PAY_TOT_AMT: '20000',
      PAY_TOT_FEE: '0',
      REF_TOT_CNT: '50',
      REF_TOT_AMT: '10000',
      REF_TOT_FEE: '0',
      taskId: '11',
      completeDte: '2017-09-09',
      completeOpr: '小猪',
      autComments: '审核意见',
      STL_STS: '成功',
    }
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },
  'GET /rest/sms/manage/stldetail'(req, res) {
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
        clrDat: '2017-4-27',
        clrTyp: '商户',
        pyeMemName: '商户',
        ccy: 'CNY',
        txnTotCnt: '122',
        txnTotAmt: `${(i + 1) * 1000}`,
        txnTolFee: '0',
        stlSts: '成功',
        stlDat: '2017-5-28',

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
  'GET /rest/sms/manage/orderdetail'(req, res) {
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
        ordId: `1000100${i}`,
        ordNo: `2000100${i}`,
        merBatch: `100${i}`,
        sourceLogName: `12121000${i}`,
        sourceTypeZh: '用户',
        sourceName: `你好-${i}`,
        targetLogName: `23231123${i}`,
        targetTypeZh: '商户',
        targetName: `商户-${i}`,
        ccy: '人民币',
        ordAmt: `100${i}`,
        creTim: '2017-5-28',

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
