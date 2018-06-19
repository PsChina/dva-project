const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/orgs'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const list = [];
    const rspData = {};
    rspData.orgId = 'RootOrg';
    rspData.orgName = '系统机构';
    rspData.key = 'RootOrg';
    rspData.orgDesc = '系统机构_勿删';
    rspData.isUse = '1';
    rspData.parentOrgId = 'sysOrg';
    rspData.value = 'RootOrg';
    rspData.label = '系统机构';
    rspData.updObj = 'zhangsan';
    rspData.creTim = '20160506122645';
    rspData.creObj = 'zhangsan';
    rspData.updTim = '20160721175515';
    rspData.children = [
      {
        orgId: '11',
        creTim: '20170407134601',
        creObj: 'yangxm',
        orgDesc: null,
        isUse: '0',
        parentOrgId: 'RootOrg',
        value: '11',
        label: '11',
        updObj: null,
        orgName: '11',
        key: '11',
        updTim: null,
      },
      {
        orgId: '12',
        creTim: '20170407134616',
        creObj: 'yangxm',
        orgDesc: null,
        isUse: '0',
        parentOrgId: 'RootOrg',
        value: '12',
        label: '12',
        updObj: null,
        orgName: '12',
        key: '12',
        updTim: null,
      },
      {
        orgId: '13',
        creTim: '20170407155657',
        creObj: 'yangxm',
        orgDesc: null,
        isUse: '0',
        parentOrgId: 'RootOrg',
        value: '13',
        label: '13',
        updObj: null,
        orgName: '13',
        key: '13',
        updTim: null,
      },
    ]
    list.push(rspData);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: list,
    });
    res.json(data);
  },
  'POST /rest/bas/org'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/orgs'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/orgs/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/org'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'GET /rest/bas/org/queryOrgTreeTable'(req, res){
    return 'test string.'
  }
};
