const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/taskMonitors'(req, res) {
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
        approvedescription: `tongyi${i}`,
        approvestatus: '1',
        backfield1: null,
        backfield2: null,
        backfield3: null,
        createdate: `2017033020482${i}`,
        curnodeno: `201609260000022${i}`,
        curpositioncode: '1006',
        curpositionname: '审核岗',
        flowbusinesstoken: `201703300000005${i}`,
        flowstatus: '99',
        flowstatusno: `201703300000005${i}`,
        modelname: '代理商开户申请',
        modelno: `201609260000022${i}`,
        modeltype: '03',
        nextnodeno: `201609260000022${i}`,
        nextpositioncode: '1006',
        nextpositionname: '审核岗',
        operatedate: `2017033020560${i}`,
        operatetype: '02',
        operatorcode: 'qiaowei',
        operatorname: 'Jewel',
        ownerdesc: null,
        ownerid: null,
        referbusinessname: `【小云电影】代理商开户申请${i}`,
        referbusinessno: '03',
        referbusinessuserid: 'miao_xc',
        referbusinessusername: 'miao_xc',
        systemname: null,
        systemno: '000',
        updatedate: `2017033020560${i}`,
        validstatus: '1',

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
  'GET /rest/bas/taskMonitor/2017033000000051'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const total = 0;
    const list = {
      taskCfgList: [{
        approvedescription: '',
        approvestatus: '',
        createdate: '20170330204824',
        flowbusinesstoken: '2017033000000051',
        flowlogno: '2017033000000053',
        flowstatus: '02',
        flowstatusno: '2017033000000052',
        logtype: '1',
        modelname: '代理商开户申请',
        modelno: '2016092600000221',
        modeltype: '03',
        nodename: '代理商开户申请',
        nodeno: '2016092600000222',
        operatedate: '20170330204824',
        operatetype: '01',
        operatorcode: 'miao_xc',
        operatorname: '缪鑫程',
        positioncode: '1005',
        positionname: '申请岗',
        referbusiness: '03',
        referbusinessname: '【小云电影】代理商开户申请',
        referbusinessuserid: 'miao_xc',
        referbusinessusername: 'miao_xc',
        status: '1',
        systemno: '011',
        updatedate: '20170330204824',
      },
      {
        approvedescription: 'tongyi',
        approvestatus: '1',
        createdate: '20170330205605',
        flowbusinesstoken: '2017033000000051',
        flowlogno: '2017033000000061',
        flowstatus: '99',
        flowstatusno: '2017033000000052',
        logtype: '1',
        modelname: '代理商开户申请',
        modelno: '2016092600000221',
        modeltype: '03',
        nodename: '代理商开户审核',
        nodeno: '2016092600000223',
        operatedate: '20170330205605',
        operatetype: '02',
        operatorcode: 'qiaowei',
        operatorname: 'Jewel',
        positioncode: '1006',
        positionname: '审核岗',
        referbusiness: '03',
        referbusinessname: '【小云电影】代理商开户申请',
        referbusinessuserid: 'miao_xc',
        referbusinessusername: 'miao_xc',
        status: '1',
        systemno: '011',
        updatedate: '20170330205605',
      }],
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
};
