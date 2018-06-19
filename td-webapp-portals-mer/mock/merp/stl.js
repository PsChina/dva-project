const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/merp/manage/settles'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 1;
    const list = [];
    for (let i = 0; i < 1; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        'ccy': 'CNY',
        'stlTyp': '1',
        'autComments': null,
        'children': [
          {
            'ccy': 'CNY',
            'busiTyp': '0001',
            'begClrDat': '20170704',
            'txnTotCnt': '12',
            'id': `20170705130045253318642920456192${i}`,
            'payTotCnt': '12',
            'txnTotAmt': '120000',
            'txnTotFee': '0',
            'agtId': '03223297124236791808',
            'agtName': '测试别动',
            'refTotFee': '0',
            'stlWay': '01',
            'fstShrCost': '1200',
            'stlDat': '20170705',
            'clrTyp': '02',
            'pyeMemId': '02223291991335636992',
            'payTotAmt': '120000',
            'refTotAmt': '0',
            'payTotFee': '0',
            'stlAmt': '120000',
            'endClrDat': '20170704',
            'pyeMemName': `肯德基${i}`,
            'refTotCnt': '0',
            'disabled': 'disabled',
            'shrSts': '0'
          }
        ],
        'txnTotCnt': '12',
        'id': `2017070513004525331864304209100${i}`,
        'payTotCnt': '12',
        'txnTotAmt': '120000',
        'txnTotFee': '0',
        'agtId': '03223297124236791808',
        'agtName': '测试别动',
        'refTotFee': '0',
        'stlWayAct': '2',
        'stlFee': null,
        'stlWay': '01',
        'stlDat': '20170705',
        'taskId': null,
        'clrTyp': '02',
        'pyeMemId': '02223291991335636992',
        'completeOpr': null,
        'payTotAmt': '120000',
        'payTotFee': '0',
        'refTotAmt': '0',
        'stlAmt': '120000',
        'pyeMemName': `肯德基${i}`,
        'stlTobeAmt': '120000',
        'stlMod': '0',
        'completeTim': null,
        'refTotCnt': '0',
        'stlSts': '5',
        'urgentAmt': '0',
        'shrSts': '0'
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

  'GET /rest/merp/manage/settle/20170705130045253318643042091000'(req, res) {
    // 获取请求参数
    // const param = qs.parse(Base64.atob(req.query.p));
    // console.log('request param =>', param);
    const datas = {
      'ccy': 'CNY',
      'stlTyp': '1',
      'autComments': null,
      'txnTotCnt': '12',
      'id': '20170705130045253318643042091008',
      'payTotCnt': '12',
      'txnTotAmt': '120000',
      'txnTotFee': '0',
      'agtId': '03223297124236791808',
      'agtName': '测试别动',
      'refTotFee': '0',
      'stlWayAct': '2',
      'stlFee': null,
      'stlWay': '01',
      'stlDat': '20170705',
      'taskId': null,
      'clrTyp': '02',
      'pyeMemId': '02223291991335636992',
      'completeOpr': null,
      'payTotAmt': '120000',
      'payTotFee': '0',
      'refTotAmt': '0',
      'stlAmt': '120000',
      'pyeMemName': '肯德基',
      'stlTobeAmt': '120000',
      'stlMod': '0',
      'completeTim': null,
      'refTotCnt': '0',
      'stlSts': '5',
      'urgentAmt': '0',
      'shrSts': '0'
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: datas,
    });
    res.json(data);
  },

  'GET /rest/merp/business/settle/201707051300452533186429204561920'(req, res) {
    // 获取请求参数
    // const param = qs.parse(Base64.atob(req.query.p));
    // console.log('request param =>', param);
    const datas = {
      'ccy': 'CNY',
      'busiTyp': '0001',
      'begClrDat': '20170704',
      'txnTotCnt': '12',
      'id': '20170705130045253318642920456192',
      'payTotCnt': '12',
      'txnTotAmt': '120000',
      'txnTotFee': '0',
      'agtId': '03223297124236791808',
      'agtName': '测试别动',
      'refTotFee': '0',
      'stlWay': '01',
      'fstShrCost': '1200',
      'stlDat': '20170705',
      'clrTyp': '02',
      'pyeMemId': '02223291991335636992',
      'payTotAmt': '120000',
      'refTotAmt': '0',
      'payTotFee': '0',
      'stlAmt': '120000',
      'endClrDat': '20170704',
      'pyeMemName': '肯德基',
      'refTotCnt': '0',
      'disabled': 'disabled',
      'shrSts': '0'
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: datas,
    });
    res.json(data);
  },

  'GET /rest/merp/manage/tradedetail'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 1;
    const list = [];
    for (let i = 0; i < 1; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        'braName': '炸鸡店',
        'seqNo': '000006',
        'batNo': '000001',
        'autCod': '',
        'ccyCod': 'CNY',
        'txnId': '249811501266997249',
        'txnDate': '20170625',
        'txnAmt': '000000000010000',
        'chnChkSts': '01',
        'agtId': '03223297124236791808',
        'agtName': '测试别动',
        'chnId': 'CC226919319286583296',
        'clearStatus': '1',
        'txnChannel': '0001',
        'stlStatus': '1',
        'merNo': '998310157320002',
        'stlDat': '20170705',
        'txnType': 'S',
        'braId': '12223295983990083584',
        'chkDat': '20170625',
        'chnName': '本地测试挡板',
        'refAmt': '',
        'merId': '02223291991335636992',
        'cleDat': '20170704',
        'txnStatus': 'S',
        'clrWay': '1',
        'tmerNo': '998001057220001',
        'ttxnId': '249811501266997249',
        'txnFee': '',
        'merName': '肯德基',
        'ttermNo': '80000023',
        'txnTime': '060342'
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

  'GET /rest/merp/manage/clearings'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 1;
    const list = [];
    for (let i = 0; i < 1; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        'ccy': 'CNY',
        'clrTyp': '02',
        'busiTyp': '0001',
        'pyeMemId': '02223291991335636992',
        'payTotAmt': '120000',
        'payTotFee': '0',
        'refTotAmt': '0',
        'chnFeeTot': null,
        'txnTotCnt': '12',
        'id': 'CLRB252941155711713280',
        'payTotCnt': '12',
        'txnTotAmt': '120000',
        'pyeMemName': '肯德基',
        'txnTotFee': '0',
        'agtId': '03223297124236791808',
        'agtName': '测试别动',
        'refTotFee': '0',
        'clrDat': '20170704',
        'fstShrCost': '1200',
        'refTotCnt': '0',
        'stlSts': '1',
        'clrId': null,
        'stlDat': '20170705'
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

  'GET /rest/merp/stlWithdraw/queryAmount'(req, res) {
    // 获取请求参数
    // const param = qs.parse(Base64.atob(req.query.p));
    // console.log('request param =>', param);
    const datas = {
      'amount': '1000'
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: datas,
    });
    res.json(data);
  },

  'GET /rest/merp/stlWithdraw/withdrawAmount'(req, res) {
    // 获取请求参数
    // const param = qs.parse(Base64.atob(req.query.p));
    // console.log('request param =>', param);
    const datas = {
      
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: datas,
    });
    res.json(data);
  },

};
