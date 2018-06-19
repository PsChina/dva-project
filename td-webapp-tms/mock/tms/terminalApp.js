const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/terminal/apps'(req, res) {
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
        appId: `${currentPage}${i}`,
        appName: `支付宝${currentPage}-${i}`,
        appPackage: 'com.alipay',
        appVersion: '1.0.2',
        appPlatform: '03',
        appAutoUpdate: '01',
        appDesc: ' 1、“红包”全新改版，新增AR实景红包，实现藏红包、找红包、红包地图多种玩法；2、“扫一扫”新增“AR扫”入口，快速便捷找红包。',
        appIssueDate: '20161222103010',
        appSzie: '102.7',
        appLogo: 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png',
        appFile: '支付宝.ipa',
        appFileName: '支付宝',
        appDescPic1: 'http://a5.mzstatic.com/us/r30/Purple122/v4/de/9e/71/de9e7158-c1fb-57c2-116b-bee244936eaa/screen696x696.jpeg',
        appDescPic2: 'http://a5.mzstatic.com/us/r30/Purple122/v4/c6/73/86/c6738654-ede4-0760-b1ad-1911abf5e0bb/screen696x696.jpeg',
        appDescPic3: 'http://a1.mzstatic.com/us/r30/Purple122/v4/ff/9b/d2/ff9bd210-2361-78f4-5476-e8910cd15470/screen696x696.jpeg',
        appDescPic4: 'http://a3.mzstatic.com/us/r30/Purple111/v4/60/33/92/603392a7-03d7-7c21-ce09-2979db3675c4/screen696x696.jpeg',
        createUserId: 'LM',
        createDate: '20170317121212',
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
  'GET /rest/tms/terminal/app/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const record = {};
    record.appId = '10';
    record.appName = '支付宝10';
    record.appPackage = 'com.alipay';
    record.appVersion = '1.0.2';
    record.appPlatform = '03';
    record.appAutoUpdate = '01';
    record.appDesc = ' 1、“红包”全新改版，新增AR实景红包，实现藏红包、找红包、红包地图多种玩法；2、“扫一扫”新增“AR扫”入口，快速便捷找红包。';
    record.appIssueDate = '20161222103010';
    record.appSzie = '102.7';
    record.appLogo = 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png';
    record.appFileName = '支付宝';
    record.createDate = '20170317121212';
    record.createUserId = 'LM';
    record.appFile = '支付宝.ipa';
    record.fileList = [{
      uid: 1,
      name: 'a.png',
      status: 'done',
      editable: true,
      rul: 'http://a5.mzstatic.com/us/r30/Purple122/v4/de/9e/71/de9e7158-c1fb-57c2-116b-bee244936eaa/screen696x696.jpeg',
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      uid: 2,
      name: 'b.png',
      status: 'done',
      editable: true,
      rul: 'http://a5.mzstatic.com/us/r30/Purple122/v4/c6/73/86/c6738654-ede4-0760-b1ad-1911abf5e0bb/screen696x696.jpeg',
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      uid: 3,
      name: 'c.png',
      status: 'done',
      editable: true,
      rul: 'http://a1.mzstatic.com/us/r30/Purple122/v4/ff/9b/d2/ff9bd210-2361-78f4-5476-e8910cd15470/screen696x696.jpeg',
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      uid: 4,
      name: 'd.png',
      status: 'done',
      editable: true,
      rul: 'http://a3.mzstatic.com/us/r30/Purple111/v4/60/33/92/603392a7-03d7-7c21-ce09-2979db3675c4/screen696x696.jpeg',
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    ];
    record.filePathList = ['http://a5.mzstatic.com/us/r30/Purple122/v4/de/9e/71/de9e7158-c1fb-57c2-116b-bee244936eaa/screen696x696.jpeg',
      'http://a5.mzstatic.com/us/r30/Purple122/v4/c6/73/86/c6738654-ede4-0760-b1ad-1911abf5e0bb/screen696x696.jpeg',
      'http://a1.mzstatic.com/us/r30/Purple122/v4/ff/9b/d2/ff9bd210-2361-78f4-5476-e8910cd15470/screen696x696.jpeg',
      'http://a3.mzstatic.com/us/r30/Purple111/v4/60/33/92/603392a7-03d7-7c21-ce09-2979db3675c4/screen696x696.jpeg',
    ];
    record.logoFileList = [{
      uid: 5,
      name: 'log.png',
      status: 'done',
      editable: true,
      rul: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      data: { LX: 'PIC', ORDERNUM: '05' },
    },
    ];
    record.logoFilePath = 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png';
    record.appFileList = [{
      uid: 6,
      name: 'zfb.ipa',
      status: 'done',
      editable: true,
      rul: 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.ipa',
      data: { LX: 'PIC', ORDERNUM: '06' },
    },
    ];
    record.appFilePath = 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png';
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: { OBJ: record },
    });
    res.json(data);
  },
  'PUT /rest/tms/terminal/app/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/tms/terminal/app'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/tms/terminal/apps'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
};

