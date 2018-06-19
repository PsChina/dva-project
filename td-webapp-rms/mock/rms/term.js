const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/rms/terms'(req, res) {
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
        terAgtName: `上海高通有限公司${currentPage}${i}`,
        terMerName: null,
        terAgtId: `031903099213953146${currentPage}${i}`,
        terBraId: null,
        terId: `052120198814978580${currentPage}${i}`,
        terMerId: null,
        terNo: `800006${currentPage}${i}`,
        terPhyNo: `ZB0${currentPage}${i}`,
        terStatus: '1',
        bankCardType: `${i % 2 === 0 ? '01' : '02'}`,
        listType: `${i % 2 === 0 ? '1' : '0'}`,
        creatTime: `2017-01-${i} 18:05:55`,
        creatObject: `undertaker${currentPage}@16${i}.com`,
        logId: `log002282303880444${i}${i}${i}${i}${i}`,
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
