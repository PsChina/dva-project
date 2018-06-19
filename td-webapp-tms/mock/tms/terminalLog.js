const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/terminal/logs'(req, res) {
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
        optLogno: `${currentPage}${i}`,
        terId: `ter${i}`,
        optTerPhyno: `phy${i}`,
        optStep: '1',
        optDesc: '测试',
        optOrg: '0',
        optOrgId: '011',
        optObj: 'yangxm',
        optDat: '20170317170120',
        terNo: `terNo${i}`,
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

  'GET /rest/tms/terminal/log/10'(req, res) {
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
