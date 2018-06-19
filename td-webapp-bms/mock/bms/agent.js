const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bms/agents'(req, res) {
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
        agtId: `${currentPage}${i}`,
        agtName: `连心信息科技有限公司${currentPage}-${i}`,
        agtParentName: '',
        agtType: '0',
        agtScope: '03',
        agtProxyProv: '120000',
        agtProxyCity: '120100',
        agtProxyArea: '',
        agtStatus: '1',
        bizSale: '张三',
        addTim: '20170314',
        agtLv: '1',

        agtEmail: '123456@qq.com',
        agtMobile: '13788888888',
        agtAddr: '上海市陆家嘴环路110号',
        agtProv: '120000',
        agtCity: '120100',
        agtArea: '120101',
        stlAc: '622848******3313',
        stlProv: '120000',
        stlCity: '120100',
        stlName: '李四',
        stlBnkName: '招商银行',
        stlCnapsName: '陆家嘴支行',
        ccy: 'USD',
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
  'GET /rest/bms/agent/10'(req, res) {
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
