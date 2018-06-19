const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bms/merchants'(req, res) {
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
        merName: `肯德基食品股份有限公司${currentPage}-${i}`,
        bizLic: '123123123',
        merStatus: '0',
        merCate: '1',
        merType: '1',
        agtName: `agt${currentPage}-${i}`,
        addTim: '20170314',
        appCompTime: '20170314',
        bizSale: '张三',
        merEmail: '123456@qq.com',
        merSname: '肯德基',
        merMobile: '13788888888',
        merAddr: '上海市陆家嘴环路110号',
        merProv: '120000',
        merCity: '120100',
        merArea: '120101',
        taxNo: '23123123',
        idEffDat: '20170115',
        idExpDat: '20180115',
        stlAc: '622848******3313',
        stlProv: '120000',
        stlCity: '120100',
        stlName: '李四',
        stlBnkName: '招商银行',
        stlCnapsName: '陆家嘴支行',
        ccy: 'HKD',
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
  'GET /rest/bms/merchant/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
};
