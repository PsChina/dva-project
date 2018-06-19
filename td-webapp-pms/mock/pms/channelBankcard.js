const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/pms/channels/bankcard'(req, res) {
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
      if (currentPage === '1') {
        list.push({
          chnId: `${currentPage}${i}`,
          chnName: `中国银联${currentPage}-${i}`,
          chnConter: `Jewel${currentPage}-${i}`,
          chnMobile: `13959991234${currentPage}${i}`,
          chnPhone: `529591${currentPage}${i}`,
          chnAddr: `上海浦东新区${currentPage}${i}`,
          creTim: `2017-03-17 16：40：40${currentPage}${i}`,
          uptTim: `2017-03-17 11：40：40${currentPage}${i}`,
          chnType: '0',
          chnStatus: '1',
          chnTxnTyp: '1',
          chnAlias: 'ZGYL',
          needCheck: '0',
          dayCutTim: '2330',
          hessianUrl: 'http://127.0.0.1:8010/tdpos-web/hessian/hessianService',
          singleDayLimit: '1000',
          singleMonthLimit: '1000',
          singleDayCount: '10',
          singleMonthCount: '10',
          pospayTxnSup: '11100111111111',
        });
      }
      if (currentPage === '2') {
        list.push({
          chnId: `${currentPage}${i}`,
          chnName: `中国银行${currentPage}-${i}`,
          chnConter: `Jewel${currentPage}-${i}`,
          chnMobile: `13959991234${currentPage}${i}`,
          chnPhone: `529591${currentPage}${i}`,
          chnAddr: `上海浦东新区${currentPage}${i}`,
          creTim: `2017-03-17 16：40：40${currentPage}${i}`,
          uptTim: `2017-03-17 11：40：40${currentPage}${i}`,
          chnType: '1',
          chnStatus: '1',
          chnTxnTyp: '1',
          chnAlias: 'ZGYH',
          needCheck: '0',
          dayCutTim: '23:30',
          hessianUrl: 'http://127.0.0.1:8010/tdpos-web/hessian/hessianService',
          singleDayLimit: '1000000',
          singleMonthLimit: '100000000',
          singleDayCount: '100000',
          singleMonthCount: '100000000',
          pospayTxnSup: '11100111111111',
          bankRelNo: '11111111111111111',
        });
      }
      if (currentPage === '3') {
        list.push({
          chnId: `${currentPage}${i}`,
          chnName: `中国金融${currentPage}-${i}`,
          chnConter: `Jewel${currentPage}-${i}`,
          chnMobile: `13959991234${currentPage}${i}`,
          chnPhone: `529591${currentPage}${i}`,
          chnAddr: `上海浦东新区${currentPage}${i}`,
          creTim: `2017-03-17 16：40：40${currentPage}${i}`,
          uptTim: `2017-03-17 11：40：40${currentPage}${i}`,
          chnType: '2',
          chnStatus: '1',
          chnTxnTyp: '1',
          chnAlias: 'ZGJR',
          needCheck: '0',
          dayCutTim: '23:30',
          hessianUrl: 'http://127.0.0.1:8010/tdpos-web/hessian/hessianService',
          singleDayLimit: '1000000',
          singleMonthLimit: '100000000',
          singleDayCount: '100000',
          singleMonthCount: '100000000',
          pospayTxnSup: '11100111111111',
          chnCertNo: '2222222222',
        });
      }
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },

  'PUT /rest/pms/channel/bankcard/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/pms/channel/bankcard'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/pms/channel/bankcard'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/pms/channels/bankcard/status'(req, res) {
    // 获取请求参数
    const result = Base64.atob(req.body);
    const msg = result.chnStatus === '0' ? '启用成功' : '禁用成功';
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: msg,
    });
    res.json(data);
  },

  'GET /rest/pms/channels/bankcard/select'(req, res) {
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
      if (currentPage === '1') {
        list.push({
          chnId: `${currentPage}${i}`,
          chnName: `中国银联${currentPage}-${i}`,
          chnConter: `Jewel${currentPage}-${i}`,
          chnMobile: `13959991234${currentPage}${i}`,
          chnPhone: `529591${currentPage}${i}`,
          chnAddr: `上海浦东新区${currentPage}${i}`,
          creTim: `2017-03-17 16：40：40${currentPage}${i}`,
          uptTim: `2017-03-17 11：40：40${currentPage}${i}`,
          chnType: '0',
          chnStatus: '1',
          pospayTxnSup: '11100111111111',
        });
      }
      if (currentPage === '2') {
        list.push({
          chnId: `${currentPage}${i}`,
          chnName: `中国银行${currentPage}-${i}`,
          chnConter: `Jewel${currentPage}-${i}`,
          chnMobile: `13959991234${currentPage}${i}`,
          chnPhone: `529591${currentPage}${i}`,
          chnAddr: `上海浦东新区${currentPage}${i}`,
          creTim: `2017-03-17 16：40：40${currentPage}${i}`,
          uptTim: `2017-03-17 11：40：40${currentPage}${i}`,
          chnType: '1',
          chnStatus: '1',
          pospayTxnSup: '11100111111111',
        });
      }
      if (currentPage === '3') {
        list.push({
          chnId: `${currentPage}${i}`,
          chnName: `中国金融${currentPage}-${i}`,
          chnConter: `Jewel${currentPage}-${i}`,
          chnMobile: `13959991234${currentPage}${i}`,
          chnPhone: `529591${currentPage}${i}`,
          chnAddr: `上海浦东新区${currentPage}${i}`,
          creTim: `2017-03-17 16：40：40${currentPage}${i}`,
          uptTim: `2017-03-17 11：40：40${currentPage}${i}`,
          chnType: '2',
          chnStatus: '1',
          pospayTxnSup: '11100111111111',
        });
      }
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },

  'GET /rest/pms/channel/bankcard/checkChnName'(req, res) {
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '该名称已存在',
    });
    res.json(data);
  },

  'GET /rest/pms/channel/bankcard/10'(req, res) {
     // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const dat = {
      chnId: '10',
      chnName: '中国银联1-0',
      chnType: '0',
      chnTxnTyp: '1',
      chnAlias: 'ZGYH',
      chnStatus: '1',
      needCheck: '0',
      dayCutTim: '23:30',
      hessianUrl: 'http://127.0.0.1:8010/tdpos-web/hessian/hessianService',
      chnConter: 'Jewel1-0',
      chnMobile: '13959991234',
      chnAddr: '上海浦东新区10',
      chnPhone: '52959110',
      creTim: '2017-03-17 16：40：4010',
      uptTim: '2017-03-17 11：40：4010',
      singleDayLimit: '1000000',
      singleMonthLimit: '100000000',
      singleDayCount: '100000',
      singleMonthCount: '100000000',
      pospayTxnSup: '01111111111110',
    };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: dat,
    });
    res.json(data);
  },

  'PUT /rest/pms/channel/bankcard/updAuth'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
