const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/pubCurrencys'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        countryId: `${currentPage}${i}`,
        country: 'china',
        countryCode: `01${i}`,
        countryShortName: 'CHN',
        currencyId: `${currentPage}${i}`,
        currencyName: 'Yuan Renminbi',
        currencyCode: `01${i}`,
        currencyShortName: 'CNY',
        currencyAbbreviations: '156',
        decimalDigit: '2',
        status: `${i % 2 === 0 ? '1' : '0'}`,
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


  'GET /rest/bas/pubCurrencys/all'(req, res) {
    // 获取请求参数
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        currencyId: `${i}`,
        currencyName: 'Yuan Renminbi',
        currencyCode: `01${i}`,
        currencyShortName: `CN${i}`,
        currencyAbbreviations: '156',
        decimalDigit: '2',
        status: '1',
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


  'POST /rest/bas/pubCurrency'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/pubCurrencys'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/pubCurrencys/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/pubCurrency/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

};
