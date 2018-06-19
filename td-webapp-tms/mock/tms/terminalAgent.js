const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/terminal/agents'(req, res) {
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
        addTim: '2017-03-30',
        agtAp: 'Jewel',
        agtEmail: `21321321${i}@qq.com`,
        agtId: `0321828236410565836${i}`,
        agtLv: '1',
        agtName: `唐宝汤包汤包${i}店`,
        agtParentName: null,
        agtScopeArea: null,
        agtScope: '0',
        agtScopeCity: null,
        agtScopeProv: null,
        agtType: '1',
        apId: `23133${i}`,
        bizSale: 'qiaowei',
        bizStatus: '1',
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

  'GET /rest/tms/terminal/agent/03218282364105658360'(req, res) {
     // 获取请求参数
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 5; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        addDat: `2017031313541${i}`,
        agtName: '小云电影',
        braName: null,
        copNam: '掌贝',
        merName: null,
        outDat: `2017031314361${i}`,
        terAgtId: '03218286630782373888',
        terBraId: null,
        terId: `0521201988161529856${i}`,
        terMerId: null,
        terModNo: 'A8',
        terNo: `8000090${i}`,
        terPhyno: `ZB00${i}`,
        terStatue: '1',
        terTyp: '01',
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      total: total,
      rspList: list,
    });
    res.json(data);
  },

  'GET /rest/tms/terminal/agent/term/05212019881615298560'(req, res) {
     // 获取请求参数
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const dat = {
      addBatno: 'BAT212019881346863104',
      addDat: '2017-03-1313: 54: 13',
      agtName: '小云电影',
      copNam: '掌贝',
      endDat: null,
      inOprId: '160921000111',
      merName: null,
      outDat: '2017-03-1314: 36: 19',
      outOprId: '160922000502',
      stoStatus: '1',
      strDat: null,
      terAddAmt: '10000',
      terAddMod: '1',
      terAgtId: '03218286630782373888',
      terBraId: null,
      terCopId: '00000001',
      terId: '05212019881615298560',
      terMerId: null,
      terModId: '00000001',
      terModNo: 'A8',
      terNetinAmt: null,
      terOutAmt: '10000',
      terOwn: '0',
      terPhyno: 'ZB002',
      terSrc: '1',
      terStatue: '1',
      terTyp: '01',
      terUseMod: null,
      terVer: '0000000004',
      verNo: 'v2.4.3',
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },

  'GET /rest/tms/terminal/agent/bind/03218282364105658360'(req, res) {
     // 获取请求参数
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 5; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        addDat: `2017031313541${i}`,
        agtName: '小云电影',
        braName: null,
        copNam: '掌贝',
        merName: null,
        outDat: `2017031314361${i}`,
        terAgtId: '03218286630782373888',
        terBraId: null,
        terId: `0521201988161529856${i}`,
        terMerId: null,
        terModNo: 'A8',
        terNo: `8000090${i}`,
        terPhyno: `ZB00${i}`,
        terStatue: '1',
        terTyp: '01',
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/agent/03218282364105658360'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/tms/terminal/agent'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'POST /rest/tms/terminal/agents/add'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/tms/terminal/agents/unbind'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

};
