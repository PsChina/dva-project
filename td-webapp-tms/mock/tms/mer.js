const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/mers'(req, res) {
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
        braId: `653222132131${i}${i}${currentPage}${i}`,
        braName: `门店${i}`,
        braShortName: `门店${i}${i}`,
        braTel: `1395999123${i}`,
        merId: `9923421321${i}`,
        merName: `商户${i}`,
        merNo: `213123123${i}`,
        agtId: `233232411212${i}`,
        agtName: `代理商${i}`,
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
