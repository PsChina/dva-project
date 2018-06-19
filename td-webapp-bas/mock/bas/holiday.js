const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/holidays'(req, res) {
    // 获取请求参数
    // const param = qs.parse(Base64.atob(req.query.p));
    // console.log('request param =>', param);
    const list = [
      { holiday: '20170402', dayType: '1', content: '休息日' },
      { holiday: '20170403', dayType: '1', content: '休息日' },
      { holiday: '20170404', dayType: '2', content: '清明节' },
      { holiday: '20170408', dayType: '1', content: '休息日' },
      { holiday: '20170409', dayType: '1', content: '休息日' },
      { holiday: '20170415', dayType: '1', content: '休息日' },
      { holiday: '20170416', dayType: '1', content: '休息日' },
      { holiday: '20170422', dayType: '1', content: '休息日' },
      { holiday: '20170423', dayType: '1', content: '休息日' },
      { holiday: '20170429', dayType: '1', content: '休息日' },
      { holiday: '20170430', dayType: '1', content: '休息日' },
      { holiday: '20170501', dayType: '2', content: '劳动节' },
      { holiday: '20170506', dayType: '1', content: '休息日' },
      { holiday: '20170507', dayType: '1', content: '休息日' },
      { holiday: '20170513', dayType: '1', content: '休息日' },
      { holiday: '20170514', dayType: '1', content: '休息日' },
      { holiday: '20170520', dayType: '1', content: '休息日' },
      { holiday: '20170521', dayType: '1', content: '休息日' },
      { holiday: '20170528', dayType: '1', content: '休息日' },
      { holiday: '20170529', dayType: '1', content: '休息日' },
      { holiday: '20170530', dayType: '2', content: '端午节' },
      { holiday: '20170603', dayType: '1', content: '休息日' },
      { holiday: '20170604', dayType: '1', content: '休息日' },
      { holiday: '20170610', dayType: '1', content: '休息日' },
      { holiday: '20170611', dayType: '1', content: '端午节' },
    ]
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },

  'PUT /rest/bas/holiday/dayType'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },


};
