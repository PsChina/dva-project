const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bms/merchant/10/business'(req, res) {
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: {
        offLinePay: [
          { title: '银联卡', biz: 'unionCard', checked: true },
          { title: '支付宝', biz: 'alipay', checked: false },
          { title: '微信支付', biz: 'wechat', checked: false },
          // { title: '百度钱包', biz: 'baidu', checked: false },
        ],
        onLinePay: [],
        realTimeSettlement: [
          { title: 'T+0', biz: 't0', checked: true },
          { title: 'D+0', biz: 'd0', checked: false },
        ],
      },
    });
    res.json(data);
  },
  'GET /rest/bms/merchant/10/business/offLine'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    let dat = {};
    const biz = param.biz;
    switch (biz) {
      case 'alipay':
        dat = {
          stlType: '1', stlCycle: '1', stlHz: '2', stlDay: '5',
          merMod: '2', belongMer: '1111111111111111111',
          payRate: '0.55',
        }
        break;
      case 'wechat':
        dat = {
          stlType: '1', stlCycle: '1', stlHz: '2', stlDay: '1',
          merMod: '2',
          payRate: '0.5',
        }
        break;
      default:
        dat = {
          stlType: '1', stlCycle: '1', stlHz: '2', stlDay: '5',
          merMcc: '5555',
          ccardRate: '0.55', ccardLim: '10',
          dcardRate: '0.5', dcardLim: '15',
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
  'DELETE /rest/bms/merchant/10/business/offLine/off'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务关闭成功',
    });
    res.json(data);
  },
  'POST /rest/bms/merchant/10/business/offLine/on'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务开通成功',
    });
    res.json(data);
  },
  'PUT /rest/bms/merchant/10/business/offLine'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务修改成功',
    });
    res.json(data);
  },
  // real time stl
  'GET /rest/bms/merchant/10/business/realTimeStl'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    let dat = {};
    const biz = param.biz;
    switch (biz) {
      case 't0':
        dat = {
          serviceFee: '0.1', serviceFeeLimit: '10', serviceMaxLimit: '100000',
        }
        break;
      case 'd0':
        dat = {
          serviceFee: '0.15', serviceFeeLimit: '10', serviceMaxLimit: '100000',
        }
        break;
      default:
        break;
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: dat,
    });
    res.json(data);
  },
  'DELETE /rest/bms/merchant/10/business/realTimeStl/off'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务关闭成功',
    });
    res.json(data);
  },
  'POST /rest/bms/merchant/10/business/realTimeStl/on'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务开通成功',
    });
    res.json(data);
  },
  'PUT /rest/bms/merchant/10/business/realTimeStl'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '业务修改成功',
    });
    res.json(data);
  },
};
