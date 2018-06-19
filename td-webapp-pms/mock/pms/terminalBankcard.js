const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/pms/channel/terminals/bankcard'(req, res) {
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
        chnTermNo: `${currentPage}${i}`,
        chnMerNo: `${currentPage}${i}`,
        chnId: `${currentPage}${i}`,
        termStatus: '1',
        chnMerType: '1',
        chnName: `渠道${currentPage}${i}`,
        chnType: '0',
        chnMerName: `商户${currentPage}${i}`,
        creTim: '2017-01-11 20:31:51',
        uptTim: '2017-01-11 20:31:51',
        isSign: '0',
        chnPinkey: '11111111111111110123456789ABCDEF',
        chnMackey: '11111111111111110123456789ABCDEF',
        chnTdkkey: '11111111111111110123456789ABCDEF',
        chnTmkkey: '11111111111111110123456789ABCDEF',
        checkValue: '',
        signTime: '2017-04-09 21:20:38',
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

  'PUT /rest/pms/channel/terminals/bankcard/status'(req, res) {
    // 获取请求参数
    const result = Base64.atob(req.body);
    const msg = result.termStatus === '0' ? '启用成功' : '禁用成功';
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: msg,
    });
    res.json(data);
  },

  'PUT /rest/pms/channel/terminal/bankcard/10-10-10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'DELETE /rest/pms/channel/terminals/bankcard'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'POST /rest/pms/channel/terminal/bankcard'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'PUT /rest/pms/channel/terminal/bankcard/key/10-10-10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
