const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/rms/mers'(req, res) {
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
        agtId: `123000234000${currentPage}${i}`,
        merEmail: `testMerEmail1000${currentPage}${i}@qq.com`,
        merId: `020000000000001000${currentPage}${i}`,
        merName: `压测商户1000${currentPage}${i}`,
        merNo: `1000000001000${currentPage}${i}`,
        merType: '0',
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
};
