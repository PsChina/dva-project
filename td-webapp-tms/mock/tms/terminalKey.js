const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/terminal/keys'(req, res) {
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
        terId: `481${currentPage}${i}`,
        terPhyno: `SN${currentPage}-${i}`,
        lmkkey: `111111${currentPage}-${i}`,
        zmkkey: `22222${currentPage}${i}`,
        zmkkeyUpdateTime: `2017-03-15 15：40：30${i}`,
        tmkChk: `333333${currentPage}${i}`,
        lpinkey: `444444${currentPage}${i}`,
        lmackey: `5555555${currentPage}${i}`,
        ltdkey: `666666${currentPage}${i}`,
        wkKeyUpdateTime: `2017-03-15 16：45：30${i}`,
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


  'GET /rest/tms/terminal/key/10'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },

  'GET /rest/tms/terminal/keys/export'(req, res) {
     // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '导出成功',
      rspData: {},
    });
    res.json(data);
  },

  'PUT /rest/tms/terminal/key/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/tms/terminal/key'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/tms/terminal/keys'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
};
