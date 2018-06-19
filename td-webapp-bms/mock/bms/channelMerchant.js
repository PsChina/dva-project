const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bms/channel/merchants/select'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspList: [
        { value: '1111111', text: '大商户1' },
      ],
    });
    res.json(data);
  },
};
