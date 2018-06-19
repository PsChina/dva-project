const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/mms/merchants'(req, res) {
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
        merName: `mer${currentPage}-${i}`,
        bizLic: '123123123',
        merStatus: '0',
        merCate: '1',
        merType: '1',
        agtName: `agt${currentPage}-${i}`,
        addTim: '20170314',
        appCompTime: '20170314',
        bizSale: '张三',
        merEmail: '123456@qq.com',
        merSname: '棠棣',
        merMobile: '13788888888',
        merAddr: '天津',
        merProv: '120000',
        merCity: '120100',
        merArea: '1,7,250,3064',
        taxNo: '23123123',
        idEffDat: '20170115',
        idExpDat: '20180115',
        stlAc: '622848******3313',
        stlProv: '120000',
        stlCity: '1,7,250,3064',
        stlName: '李四',
        stlBnkName: '招商银行',
        stlCnapsName: '金桥',
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
  'GET /rest/mms/merchant/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/mms/merchant/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/mms/merchant'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/mms/merchants'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
