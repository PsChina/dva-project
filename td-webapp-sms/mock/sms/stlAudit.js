const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/audit/settles'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        ID: `${i}`,
        STL_DAT: '2017-4-27',
        STL_MOD: `${currentPage - 1}`,
        STL_TYP: `${currentPage - 1}`,
        CLR_TYP: `0${currentPage}`,
        PYE_MEM_NAME: `0${currentPage}`,
        CCY: 'CNY',
        STL_AMT: `${(i + 1) * 1000}`,
        STL_STS: `${i}`,
        BEG_CLR_DAT: '2017-4-21',
        NED_CLR_DAT: '2017-4-26',
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

  'GET /rest/sms/audit/settle/1'(req, res) {
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
};
