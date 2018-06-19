const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/rms/blackList/stores'(req, res) {
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
        braId: `6227002282303880444${i}${i}${i}${i}${i}`,
        braName: `KTC---10213${i + i}`,
        braShortName: `KTC-${i + i}`,
        merName: `KTC食品公司${i}`,
        agtName: `USA代理${i}`,
        braStatus: `${i === 1 ? '0' : '1'}`,
        bankCardNo: `6227002282303880444${i}${i}${i}${i}${i}`,
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
  'POST /rest/rms/blackList/store'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/rms/blackList/stores'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

};
