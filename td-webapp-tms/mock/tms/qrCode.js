const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/qrcodes'(req, res) {
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
        qrId: `${currentPage}${i}`,
        status: '1',
        merId: `9923421321${i}`,
        merName: `商户${i}`,
        agtId: `233232411212${i}`,
        agtName: `代理商${i}`,
        storeId: `653222132131${i}${i}${i}`,
        storeName: `门店${i}`,
        createUserId: `321321232133${currentPage}${i}`,
        createUserName: `dell${i}`,
        createTime: `2017090115321${i}`,
        updateTime: `2017090115321${i}`,
        qrFile: `26529075755981209${i}`,
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

  'POST /rest/tms/qrcodes'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/qrcode/10'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/qrcodes/status'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'DELETE /rest/tms/qrcodes'(req, res) {
      // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
      rspData: {},
    });
    res.json(data);
  },

  'GET /rest/tms/terminal/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/terminals/stats'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/terminal/queryAuth'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const rspData = {};
    rspData.fPospayTxnSup = '111111111111111';
    rspData.pospayTxnSup = '111111111111111';
    rspData.bankCardSup = '1';
    rspData.terId = '10';
    const data = mockjs.mock({
      rspData: rspData,
      rspCod: '200',
      rspMsg: '查询成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/terminal/auth'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

};
