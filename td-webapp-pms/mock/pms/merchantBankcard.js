const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/pms/channel/merchants/bankcard'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    let currentPage = param.currentPage;
    if (!currentPage) {
      currentPage = 1;
    }
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        chnMerNo: `${currentPage}${i}`,
        chnId: `${currentPage}${i}`,
        chnName: `中国银行${currentPage}-${i}`,
        chnMerType: '1',
        chnMerName: `中国银行商户${currentPage}-${i}`,
        chnType: '1',
        chnMerStatus: '1',
        areaCode: '110000,110100',
        pospayTxnSup: '11100111111111',
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

  'GET /rest/pms/channel/merchant/bankcard/1010'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const dat = {
      chnId: '10',
      chnName: '中国银行1-0',
      chnType: '1',
      chnMerNo: '10',
      chnMerName: '中国银行商户1-0',
      chnMerType: '1',
      chnMerStatus: '1',
      singleDayLimit: '1000000',
      singleMonthLimit: '100000000',
      singleDayCount: '100000',
      singleMonthCount: '100000000',
      singleMinAmt: '1',
      singleMaxAmt: '50000',
      feeMode: '1',
      debitCardRate: '0',
      debitCardTop: '0',
      creditCardRate: '0',
      creditCardTop: '0',
      minBill: '0',
      areaCode: '110000,110100',
      pospayTxnSup: '11111111110000',
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },
  'PUT /rest/pms/channel/merchant/bankcard/10-10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/pms/channel/merchant/bankcard'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/pms/channel/merchant/bankcard'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
  'POST /rest/pms/channel/merchants/bankcard'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '导入成功',
    });
    res.json(data);
  },
  'PUT /rest/pms/channel/merchant/bankcard'(req, res) {
    // 获取请求参数
    const result = Base64.atob(req.body);
    console.log('request param =>', result);
    const msg = result.chnStatus === '0' ? '开启成功' : '关闭成功';
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: msg,
    });
    res.json(data);
  },

  'PUT /rest/pms/channel/merchants/bankcard/status'(req, res) {
    // 获取请求参数
    const result = Base64.atob(req.body);
    const msg = result.chnStatus === '0' ? '启用成功' : '禁用成功';
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: msg,
    });
    res.json(data);
  },

  'GET /rest/pms/channel/merchant/bankcard/checkChnMerNo'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '该渠道下该商户已存在',
    });
    res.json(data);
  },

  'PUT /rest/pms/channel/merchant/bankcard/updAuth'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
