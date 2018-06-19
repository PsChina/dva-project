const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/sms/channel/checks'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }

      list.push({
        chkSumId: `${i}`,
        chnId: `${i}`,
        chnName: `中国银联${currentPage}-${i}`,
        chnBuzType: '1000',
        chkDat: '2017-4-27',
        ccyCod: 'CNY',
        chkTotCnt: '0',
        chkTotAmt: '0',
        sucTotCnt: '0',
        sucTotAmt: '0',
        errTotCnt: '0',
        errTotAmt: '0',
        doubtTotCnt: '0',
        doubtTotAmt: '0',
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

  'GET /rest/sms/channels/select'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('param', param);
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        chnId: `${i}`,
        chnName: `银联${i}`,
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },

  'GET /rest/sms/channel/check'(req, res) {
    const list = [];
    for (let i = 0; i < 3; i++) {
      list.push({
        id: `${i}`,
        chkSumId: `${i}`,
        chnId: `${i}`,
        chnName: `中国银联-${i}`,
        chnBuzType: '1000',
        chkDat: '2017-4-27',
        ccyCod: 'CNY',
        chkTotCnt: '0',
        chkTotAmt: '0',
        sucTotCnt: '0',
        sucTotAmt: '0',
        errTotCnt: '0',
        errTotAmt: '0',
        doubtTotCnt: '0',
        doubtTotAmt: '0',
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },

  'GET /rest/sms/channel/check/success'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('param', param);
    const list = [];
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
      total: 0,
    });
    res.json(data);
  },

  'GET /rest/sms/channel/check/detail'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('param', param);
    const list = [];
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
      total: 0,
    });
    res.json(data);
  },
};
