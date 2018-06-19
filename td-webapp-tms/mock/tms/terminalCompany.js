const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/terminal/companys'(req, res) {
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
        copId: `${currentPage}${i}`,
        copNam: `深圳百富${currentPage}-${i}`,
        copShNam: `百富${currentPage}-${i}`,
        copDesc: `上海市浦东新区${currentPage}${i}`,
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

  'GET /rest/tms/terminal/company/10'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/company/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/tms/terminal/company'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/tms/terminal/companys'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
  'GET /rest/tms/terminal/companys/select'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const list = [];
    list.push({
      copId: '01',
      copNam: '百富',
    });
    list.push({
      copId: '02',
      copNam: '联迪',
    });
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },
};
