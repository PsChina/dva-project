const mockjs = require('mockjs');
// const qs = require('qs');
// const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/count/check'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        chkTotCntList: ['0', '0', '0', '4', '5', '6', '0', '0', '0', '0', '0', '0', '0', '1', '2'],
        sucTotCntList: ['0', '0', '0', '1', '2', '3', '0', '0', '0', '0', '0', '0', '0', '0', '2'],
        todayCheckInfo: { doubtCount: '0', errorCount: '0' },
        chkDateList: ['6月20日', '6月21日', '6月22日', '6月23日', '6月24日', '6月25日', '6月26日', '6月27日', '6月28日', '6月29日', '6月30日', '7月1日', '7月2日', '7月3日', '7月4日'],
      },
    });
    res.json(data);
  },

  'GET /rest/sms/count/settle'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        shouldStlAmtList: ['0', '0.04', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.11', '17.74', '0.01'],
        settledAmtList: ['0', '0.04', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.11', '17.74', '0.00'],
        todaySettleInfo: { shouldStlAmt: '0.01', settledAmt: '0.00' },
        stlDateList: ['6月20日', '6月21日', '6月22日', '6月23日', '6月24日', '6月25日', '6月26日', '6月27日', '6月28日', '6月29日', '6月30日', '7月1日', '7月2日', '7月3日', '7月4日'],
      },
    });
    res.json(data);
  },

  'GET /rest/sms/count/share'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        monthList: ['2017年1月', '2017年2月', '2017年3月', '2017年4月', '2017年5月', '2017年6月'],
        shaTotCostList: ['100.00', '200.00', '300.00', '400.00', '500.00', '600.00'],
        monthShareInfo: {
          shaTotCost: '0',
        },
      },
    });
    res.json(data);
  },
};
