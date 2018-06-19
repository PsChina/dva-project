const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/rms/blackList/mers'(req, res) {
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
        merId: `6227002282303880444${i}${i}${i}${i}${i}`,
        merName: `KFC-----ciciciic${i}${i}`,
        merNo: `8880323${i}${i + 1}`,
        merType: `${i % 3}`,
        agtId: `542321sdsd${i * 4}`,
        agtName: `代理商【${i}】`,
        listType: `${i % 2 === 0 ? '1' : '0'}`,
        creatTime: `2017-02-${i} 18:05:55`,
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
  'POST /rest/rms/blackList/mer'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/rms/blackList/mers'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

};
