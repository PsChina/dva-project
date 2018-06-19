const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bms/agent/10/business'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        offLinePay: [
          { title: '银联卡', biz: 'unionCard', checked: true },
          { title: '支付宝', biz: 'alipay', checked: true },
          { title: '微信支付', biz: 'wechat', checked: false },
          // { title: '百度钱包', biz: 'baidu', checked: false },
        ],
        onLinePay: [],
      },
    });
    res.json(data);
  },
  'GET /rest/bms/agent/10/business/offLine'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    let dat = {};
    const biz = param.biz;
    switch (biz) {
      case 'alipay':
        dat = {
          shareType: '1',
          shareCost: 0.2, costLimit: 10,
        }
        break;
      case 'wechat':
        dat = {
          shareType: '1',
          shareCost: 0.2, costLimit: 10,
        }
        break;
      default:
        dat = {
          dcardCost1: 0.3, dcardCostLimit1: 30,
          ccardCost1: 0.35, ccardCostLimit1: 50,
          shareType: '1',
          txnRange1Start: '0', txnRange1End: 100, sharePercent1: 50,
          txnRange2Start: 100, txnRange2End: 200, sharePercent2: 60,
          txnRange3Start: 200, txnRange3End: 300, sharePercent3: 70,
          txnRange4Start: 300, sharePercent4: 80,
        };
        break;
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: dat,
    });
    res.json(data);
  },
  'DELETE /rest/bms/agent/10/business/offLine/off'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务关闭成功',
    });
    res.json(data);
  },
  'POST /rest/bms/agent/10/business/offLine/on'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务开通成功',
    });
    res.json(data);
  },
  'PUT /rest/bms/agent/10/business/offLine'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务修改成功',
    });
    res.json(data);
  },
};
