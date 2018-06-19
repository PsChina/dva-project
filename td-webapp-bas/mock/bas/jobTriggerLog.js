const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/jobTriggerLogs'(req, res) {
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
        id: `${currentPage}${i}`,
        jobGroup: 'DEFAULT',
        jobName: '结算',
        jobCron: '0 50 7 * * ?',
        jobDesc: '结算操作',
        jobClass: 'com.xxl.job.admin.core.jobbean.RemoteHttpJobBean',
        executorAddress: '192.168.0.188:1994',
        executorHandler: 'stlTxnJobHandler',
        executorParam: '011',
        triggerTime: 1491609000000,
        triggerStatus: 'SUCCESS',
        triggerMsg: 'Trigger running, <br>>>>[address] : 192.168.0.188:1994, <br>>>>[status] : SUCCESS, <br>>>>[msg] : null <br><hr>',
        handleTime: 1491609000000,
        handleStatus: 'SUCCESS',
        handleMsg: '',
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
  'POST /rest/bas/jobTriggerLog'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'GET /rest/bas/jobTriggerLog/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const record = {};
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: { OBJ: record },
    });
    res.json(data);
  },
};
