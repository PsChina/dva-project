const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/business/settles'(req, res) {
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
        BUSI_TYP: `0${currentPage}`,
        CLR_TYP: `0${currentPage}`,
        PYE_MEM_ID: `000001${i}`,
        PYE_MEM_NAME: `0${currentPage}`,
        STL_DAT: '2017-05-15',
        BEG_CLR_DAT: '2017-05-01',
        END_CLR_DAT: '2017-05-04',
        STL_WAY: `0${currentPage}`,
        CCY: 'CNY',
        STL_AMT: `${(i + 1) * 1000}`,
        TXN_TOT_CNT: '100',
        TXN_TOT_AMT: '10000',
        TXN_TOT_FEE: '0',
        PAY_TOT_CNT: '50',
        PAY_TOT_AMT: '20000',
        PAY_TOT_FEE: '0',
        REF_TOT_CNT: '50',
        REF_TOT_AMT: '10000',
        REF_TOT_FEE: '0',
        DEAL_STS: `${currentPage - 1}`,
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

  'GET /rest/sms/business/settle/1'(req, res) {
    const dat = {
      ID: `${1}`,
      BUSI_TYP: '互联网',
      CLR_TYP: '商户',
      PYE_MEM_ID: '213123123123',
      PYE_MEM_NAME: '收款方名称',
      BEG_CLR_DAT: '2017-05-01',
      END_CLR_DAT: '2017-05-04',
      TXN_TOT_CNT: '100',
      TXN_TOT_AMT: '10000',
      TXN_TOT_FEE: '0',
      PAY_TOT_CNT: '50',
      PAY_TOT_AMT: '20000',
      PAY_TOT_FEE: '0',
      REF_TOT_CNT: '50',
      REF_TOT_AMT: '10000',
      REF_TOT_FEE: '0',
      CCY: '人民币',
      STL_DAT: '2017-05-09',
      STL_STS: '已处理',
    }
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },

  'GET /rest/sms/business/clearings'(req, res) {
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
        pyeMemId: `000000000000000000-${i}`,
        pyeMemName: `收款方名称-${i}`,
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

};
