const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/jobTriggerInfos'(req, res) {
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
        jobName: `实时结算数据重置${i}`,
        jobCron: '0 30 0 * * ? *',
        jobDesc: '当日未打款实时结算数据重置',
        jobClass: 'com.xxl.job.admin.core.jobbean.RemoteHttpJobBean',
        addTime: '1484554873000',
        updateTime: '1488446813000',
        author: 'zhangsan',
        alarmEmail: 'zhangsan@qq.com',
        alarmThreshold: 1,
        executorAddress: '192.168.0.188:1994',
        executorHandler: 'cancelRealStlJobHandler',
        executorParam: '011',
        glueSwitch: 0,
        jobStatus: 'NORMAL',
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
  'POST /rest/bas/jobTriggerInfo'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/jobTriggerInfos'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/jobTriggerInfos/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/jobTriggerInfo'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
