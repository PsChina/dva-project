const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/rms/rule/templets'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 18;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        tmpId: `${i}`,
        tmpType: '0',
        tmpName: '单笔最低不超过{x}元',
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
  'GET /rest/rms/rules/0'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 12;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        ruleId: `${i}`,
        tmpId: `${i}`,
        ruleName: '单笔最低不超过{x}元',
        ruleStatus: '1',
        ruleTriType: '2',
        ruleTriRate: `1${i}`,
        ruleWarnType: '1',
        ruleWarnGrp: `${i},6,8,22`,
        ruleParam1: `1${i}`,
        ruleParam2: `2${i}`,
        ruleParam3: `3${i}`,
        ruleParam4: `4${i}`,
        ruleParam5: `5${i}`,
        ruleRemark: `备注备注${i}`,
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
  'GET /rest/rms/rules'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 12;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        ruleId: `${i}`,
        tmpId: `${i}`,
        ruleName: '单笔最低不超过{x}元',
        ruleStatus: '1',
        ruleTriType: '2',
        ruleTriRate: `1${i}`,
        ruleWarnType: '1',
        ruleWarnGrp: `${i},6,8,22`,
        ruleParam1: `1${i}`,
        ruleParam2: `2${i}`,
        ruleParam3: `3${i}`,
        ruleParam4: `4${i}`,
        ruleParam5: `5${i}`,
        ruleRemark: `备注备注${i}`,
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
  'POST /rest/rms/message/0'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/rms/rule/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '更新成功',
    });
    res.json(data);
  },
  'POST /rest/rms/rule/0'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/rms/rule/0'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '更新成功',
    });
    res.json(data);
  },
};
