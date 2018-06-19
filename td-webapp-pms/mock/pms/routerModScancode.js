const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/pms/router/mods/scancode'(req, res) {
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
        modNo: `${10 + i}`,
        modName: `扫码自定义模板-${i}`,
        txnChannel: `${i % 2 === 0 ? '1011' : '1012'}`,
        smartRoute: `${i % 2 === 0 ? '1' : '0'}`,
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

  'GET /rest/pms/router/mod/checkModNo/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '模版不重复',
    });
    res.json(data);
  },

  'GET /rest/pms/router/mod/checkModNo/11'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '999',
      rspMsg: '该模版编号已使用',
    });
    res.json(data);
  },


  'POST /rest/pms/router/mod'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '路由添加成功',
    });
    res.json(data);
  },


  'POST /rest/pms/router/mod/mer/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '路由添加成功',
    });
    res.json(data);
  },

  'PUT /rest/pms/router/mod/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'GET /rest/pms/router/mod/10'(req, res) {
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
        chnMerName: `渠道商户24-${i}`,
        chnTermNo: `49421234-${i}`,
        currencySupport: 'CNY,USD',
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

  'GET /rest/pms/router/mod/11'(req, res) {
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
        merId: '10',
        merName: 'KFC哔了狗1-0',
        chnName: `中国银行1~${i}`,
        chnMerNo: `49238424-${i}`,
        chnMerName: `渠道商户24-${i}`,
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

  // 'GET /rest/pms/merchant/routers/bankcard/10'(req, res) {
  //   // 获取请求参数
  //   const param = qs.parse(Base64.atob(req.query.p));
  //   console.log('request param =>', param);
  //   const currentPage = param.currentPage;
  //   const total = 22;
  //   const list = [];
  //   for (let i = 0; i < 10; i++) {
  //     if (currentPage >= 3 && i > 1) {
  //       break;
  //     }
  //     list.push({
  //       merId: '10',
  //       merName: 'KFC哔了狗1-0',
  //       chnName: `中国银行1~${i}`,
  //       chnMerNo: `49238424-${i}`,
  //       chnMerName: `渠道商户24-${i}`,
  //       chnTermNo: `49421234-${i}`,
  //       isDefault: `${i === 1 ? '默认' : '非默认'}`,
  //       chnMerType: `${i === 2 ? '大商户' : '小商户'}`,
  //     });
  //   }
  //   const data = mockjs.mock({
  //     rspCod: '200',
  //     rspMsg: 'success',
  //     total: total,
  //     rspList: list,
  //   });
  //   res.json(data);
  // },

  // 'GET /rest/pms/merchant/routers/bankcard/select/10'(req, res) {
  //   // 获取请求参数
  //   const param = qs.parse(Base64.atob(req.query.p));
  //   console.log('request param =>', param);
  //   const currentPage = param.currentPage;
  //   const total = 22;
  //   const list = [];
  //   for (let i = 0; i < 10; i++) {
  //     if (currentPage >= 3 && i > 1) {
  //       break;
  //     }
  //     list.push({
  //       merId: '10',
  //       merName: 'KFC哔了狗1-0',
  //       chnName: `中国银行1~${i}`,
  //       chnMerNo: `2131466-${i}`,
  //       chnMerName: `未绑定渠道商户24-${i}`,
  //       chnTermNo: `49421234-${i}`,
  //       isDefault: `${i === 1 ? '默认' : '非默认'}`,
  //       chnMerType: `${i === 2 ? '大商户' : '小商户'}`,
  //     });
  //   }
  //   const data = mockjs.mock({
  //     rspCod: '200',
  //     rspMsg: 'success',
  //     total: total,
  //     rspList: list,
  //   });
  //   res.json(data);
  // },

  // 'PUT /rest/pms/merchant/router/bankcard/default/10'(req, res) {
  //   // 获取请求参数
  //   console.log('request param =>', Base64.atob(req.body));
  //   const data = mockjs.mock({
  //     rspCod: '200',
  //     rspMsg: '设置默认成功',
  //   });
  //   res.json(data);
  // },

  'DELETE /rest/pms/router/mod/mer/11232131111~0'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '路由删除成功',
    });
    res.json(data);
  },


};
