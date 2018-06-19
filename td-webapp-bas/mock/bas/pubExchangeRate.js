const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/pubExchangeRates'(req, res) {
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
        exchangeId: `${i}`,
        rateId: `${currentPage}${i}`,
        fromCurrency: 'CNY',
        toCurrencys: 'USD,HKD,TWD,JPY',
        dataCollectingTime: '2017-07-28 19:30:00',
        rate: '1.00372',
        upRate: '0.5',
        downRate: '0.5',
        riskRateFloat: '1.0',
        dataSource: 'baidu',
        sourceKey: '11111111111111',
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
  'GET /rest/bas/pubExchangeRate'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];

    list.push({
      id: '1',
      exchangeId: '0',
      fromCurrency: 'CNY',
      toCurrency: 'USD',
      dataCollectingTime: '2017-07-28 19:30:00',
      createTime: '2017-07-28 19:30:05',
      baseRate: '1.00372',
      buyPrice: `${this.baseRate * 0.995}`,
      salePrice: `${this.baseRate * 1.005}`,
      updateObj: 'System',
    });
    list.push({
      id: '2',
      exchangeId: '0',
      fromCurrency: 'CNY',
      toCurrency: 'HKD',
      dataCollectingTime: '2017-07-28 19:30:00',
      createTime: '2017-07-28 19:30:05',
      baseRate: '1.10372',
      buyPrice: `${this.baseRate * 0.995}`,
      salePrice: `${this.baseRate * 1.005}`,
      updateObj: 'System',
    });
    list.push({
      id: '3',
      exchangeId: '0',
      fromCurrency: 'CNY',
      toCurrency: 'JPY',
      dataCollectingTime: '2017-07-28 19:30:00',
      createTime: '2017-07-28 19:30:05',
      baseRate: '1.20372',
      buyPrice: `${this.baseRate * 0.995}`,
      salePrice: `${this.baseRate * 1.005}`,
      updateObj: 'System',
    });
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },

  'POST /rest/bas/pubExchangeRate'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/pubExchangeRates'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/pubExchangeRates/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/pubExchangeRate/0'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

};
