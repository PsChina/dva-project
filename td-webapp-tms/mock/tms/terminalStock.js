const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/terminal/stocks'(req, res) {
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
        terId: `${currentPage}${i}`,
        terPhyno: `phy${i}`,
        terCopId: '01',
        copNam: '百富',
        terModId: '01',
        terModNo: 's007',
        terTyp: i > 5 ? '02' : '01',
        terVer: 'v1.0',
        addDat: '20170320095623',
        outDat: '20170321095623',
        addBatno: `bat20170320}${i}`,
        stoStatus: '0',
        strDat: '20170320',
        endDat: '20170320',
        terSrc: '1',
        terUseMod: '1',
        terAddAmt: '100',
        terOutAmt: '200',
        terNetinAmt: '300',
        inOprId: '张三',
        outOprId: '李四',
        terOwn: '1',
        merName: '服装贸易',
        agtName: '服装贸易代理商',
        terAddMod: '1',
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

  'GET /rest/tms/terminal/stock/10'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/stock/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/tms/terminal/stock'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/tms/terminal/stocks'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'POST /rest/tms/terminal/stock/stockAddBatch'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '入库成功',
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/stock/stocksOut'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '出库成功',
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/stock/recoveryList'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '回收成功',
    });
    res.json(data);
  },

  'GET /rest/tms/terminal/stock/selectTerVer'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const list = [];
    list.push({
      verId: '1',
      verNo: 'v1.0',
    });
    list.push({
      verId: '2',
      verNo: 'v2.0',
    });
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },
  'GET /rest/tms/terminal/stock/selectParMod'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const list = [];
    list.push({
      parmod: '13',
      partyp: '福州',
    });
    list.push({
      parmod: '14',
      partyp: '其他',
    });
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },

};
