const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/pms/merchants/scancode'(req, res) {
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
        chnId: `${currentPage}${i}`,
        chnType: '1',
        chnStatus: '1',
        chnName: `支付宝${currentPage}-${i}`,
        chnAlias: `AliPay${currentPage}-${i}`,
        chnConter: `Jewel${currentPage}-${i}`,
        chnMobile: `13959991234${currentPage}${i}`,
        chnPhone: `5295991${currentPage}${i}`,
        chnAddr: `上海浦东新区${currentPage}${i}`,
        creTim: `2017-03-17 16：40：40${currentPage}${i}`,
        uptTim: `2017-03-17 11：40：40${currentPage}${i}`,
        dayCutTim: `2017-03-17 11：40：40${currentPage}${i}`,
        needCheck: '0',
        merId: `${currentPage}${i}`,
        merType: '1',
        merName: `本地测试挡板：40${currentPage}${i}`,
        merStatus: '1',
        hessianUrl: `上海浦东新区${currentPage}${i}`,
        chnMerType: '1',
        chnMerName: `本地测试挡板：40${currentPage}${i}`,
        chnMerId: `${currentPage}${i}`,
        chnMerStatus: '开通',
        singleDayLimit: '1000000',
        singleMonthLimit: '100000000',
        singleDayCount: '100000',
        singleMonthCount: '100000000',
        scanType: '2',
        chnTxnType: '1',
        chnMerNo: `${currentPage}${i}`,
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

  'GET /rest/pms/merchant/scancode/10'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/pms/merchant/scancode/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/pms/merchant/scancode'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/pms/merchant/scancode'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
  'PUT /rest/pms/merchant/scancode'(req, res) {
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
};
