const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/pms/merchants'(req, res) {
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
        merId: `${currentPage}${i}`,
        merName: `KFC哔了狗${currentPage}-${i}`,
        merNo: `商户号49238424${i}`,
        modNo: `${10 + i}`,
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

  'GET /rest/pms/merchant/routers/scancode/10'(req, res) {
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
        chnMerId: `11232131111~${i}`,
        modNo: `${i === 1 ? '10' : ''}`,
        merId: '10',
        merName: 'KFC哔了狗1-0',
        chnName: `中国银行1~${i}`,
        chnMerNo: `49238424-${i}`,
        chnMerName: `渠道商户14-${i}`,
        chnTermNo: `49421234-${i}`,
        currencySupport: 'USD,CNY',
        routerCurrency: 'CNY',
        isDefault: `${i === 1 ? '1' : '0'}`,
        chnMerType: `${i === 2 ? '2' : '1'}`,
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

  'GET /rest/pms/merchant/routers/scancode/11'(req, res) {
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
        chnMerId: `11232131111~${i}`,
        modNo: '10',
        merName: 'KFC哔了狗1-0',
        chnName: `中国银行1~${i}`,
        chnMerNo: `49238424-${i}`,
        chnMerName: `渠道商户14-${i}`,
        currencySupport: 'USD,CNY',
        chnTermNo: `49421234-${i}`,
        isDefault: `${i === 1 ? '1' : '0'}`,
        chnMerType: `${i === 2 ? '2' : '1'}`,
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

  'GET /rest/pms/merchant/routers/scancode/alipay/select/10'(req, res) {
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
        chnMerId: `11232131111~${i}`,
        modNo: '10',
        merName: 'Alipay1-0',
        chnName: `中国银行1~${i}`,
        chnMerNo: `Alipay-${i}`,
        chnMerName: `未绑定渠道商户24-${i}`,
        chnMerCurrency: 'USD,CNY',
        currencySupport: 'USD,CNY',
        chnTermNo: `49421234-${i}`,
        isDefault: `${i === 1 ? '1' : '0'}`,
        chnMerType: `${i === 2 ? '1' : '2'}`,
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

  'GET /rest/pms/merchant/routers/bankcard/mod/select/10'(req, res) {
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
        chnMerId: `11232131111~${i}`,
        modNo: '10',
        merName: 'COlaie1-0',
        chnName: `中国银行1~${i}`,
        chnMerNo: `union-${i}`,
        chnMerName: `未绑定渠道商户24-${i}`,
        chnMerCurrency: 'USD,CNY',
        currencySupport: 'USD,CNY',
        chnTermNo: `49421234-${i}`,
        isDefault: `${i === 1 ? '1' : '0'}`,
        chnMerType: `${i === 2 ? '1' : '2'}`,
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

  'GET /rest/pms/merchant/routers/scancode/select/10'(req, res) {
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
        chnMerId: `11232131111~${i}`,
        modNo: '10',
        merName: 'COlaie1-0',
        chnName: `中国银行1~${i}`,
        chnMerNo: `union-${i}`,
        chnMerName: `未绑定渠道商户24-${i}`,
        chnMerCurrency: 'USD,CNY',
        currencySupport: 'USD,CNY',
        chnTermNo: `49421234-${i}`,
        isDefault: `${i === 1 ? '1' : '0'}`,
        chnMerType: `${i === 2 ? '1' : '2'}`,
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

  'GET /rest/pms/merchant/routers/scancode/wechat/mod/select/11'(req, res) {
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
        chnMerId: `11232131111~${i}`,
        modNo: '11',
        merName: 'Wechat1-0',
        chnName: `中国银行1~${i}`,
        chnMerNo: `Wechat-${i}`,
        chnMerName: `未绑定渠道商户24-${i}`,
        chnMerCurrency: 'USD,CNY',
        currencySupport: 'USD,CNY',
        chnTermNo: `49421234-${i}`,
        isDefault: `${i === 1 ? '1' : '0'}`,
        chnMerType: `${i === 2 ? '1' : '2'}`,
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

  'PUT /rest/pms/merchant/router/scancode/default/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '设置默认成功',
    });
    res.json(data);
  },

  'DELETE /rest/pms/merchant/routers/scancode/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '路由删除成功',
    });
    res.json(data);
  },

  'POST /rest/pms/merchant/router/scancode/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '路由添加成功',
    });
    res.json(data);
  },

  'POST /rest/pms/merchant/router/scancode/mod/11'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '模版套用成功',
    });
    res.json(data);
  },

};
