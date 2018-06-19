const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/merp/count/txn/his'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        wechatValueList: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '30', '1'],
        masterValueList: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        aliValueList: ['0', '0.04', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '11', '174', '1'],
        monthList: ['6月7日', '6月8日', '6月9日', '6月10日', '6月11日', '6月12日', '6月13日', '6月14日', '6月15日', '6月16日', '6月17日', '6月18日', '6月19日', '6月20日', '6月21日'],
        bankValueList: ['0', '0', '0', '0', '0', '0', '0', '0', '1628', '28599', '16295', '0', '2227', '0', '5161'],
        visaValueList: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      },
    });
    res.json(data);
  },

  'GET /rest/merp/count/txn/today'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        todayCount: [
          { name: 'Union', value: '246' },
          { name: 'Visa', value: '0' },
          { name: 'Master', value: '0' },
          { name: 'Alipay', value: '406' },
          { name: 'Wechat', value: '444' },
        ],
      },
    });
    res.json(data);
  },

  'GET /rest/merp/count/store/txn'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        braValueList: ['迈克尔杰克逊', '代理商门户测试门店', '张五', '门店2号', '默认门店'],
        countValueList: ['1096', '0', '0', '3230', '2508'],
      },
    });
    res.json(data);
  },

  'GET /rest/merp/count/term/txn'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        termList: ['80000023', '80000024', '80000025', '80000026', '80000027'],
        countValueList: ['1096', '1500', '2089', '880', '3000'],
      },
    });
    res.json(data);
  },

  'GET /rest/merp/count/settle/amt'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        watStlAmt: '1000000',
        ccy: 'USD',
        sucStlAmt: '2000000',
      },
    });
    res.json(data);
  },
};
