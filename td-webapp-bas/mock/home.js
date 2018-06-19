const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /pms/rest/expOrd'(req, res) {
    // 获取请求参数
    console.log('request param base64 =>', req.query.p);
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    // 构建响应数据
    const expOrdInfo = { amt1: 320,
      amt2: 300,
      count1: 60,
      count2: 80 };
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspList: expOrdInfo,
    });
    console.log('data =>', data);
    res.json(data);
  },
  'GET /pms/rest/terFault'(req, res) {
    // 获取请求参数
    console.log('request param base64 =>', req.query.p);
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    if (param.requestType === 'position') {
      // 构建响应数据
      const faultTerInfo = [
    { name: 'a地区小区1北门', value: [116.7, 39.53] },
    { name: 'b地区小区2北门', value: [115.480656, 35.23375] },
    { name: 'c地区小区1北门', value: [117.27, 31.86] },
    { name: 'd地区小区1北门', value: [114.31, 30.52] },
    { name: 'e地区小区1北门', value: [125.03, 46.58] },
      ];
      const data = mockjs.mock({
        rspCod: '200',
        rspMsg: 'success',
        rspList: faultTerInfo,
      });
      console.log('data =>', data);
      res.json(data);
    }
    if (param.requestType === 'table') {
         // 构建响应数据
      const currentPage = param.currentPage;
      const total = 22;
      const myDate = new Date();
      const Tim = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDay()} ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
    // console.log('shijian===>', Tim);
      const list = [];
      for (let i = 0; i < 10; i++) {
        if (currentPage >= 3 && i > 1) {
          break;
        }
        list.push({
          faultId: `${i}`,
          terId: `${currentPage}${i}`,
          agtName: '张三',
          compName: '交通银行',
          commName: currentPage,
          faultTim: `${Tim}`,
          faultType: '111',
          faultReason: '机器损坏',
          faultKeepTim: '50',
          warnCount: `${i}`,
          lastWarnTim: `${Tim}`,
        });
      }
      const data = mockjs.mock({
        rspCod: '200',
        rspMsg: 'success',
        total: total,
        rspList: list,
      });
      console.log('data =>', data);
      res.json(data);
    }
  },
  'GET /pms/rest/terLack'(req, res) {
    // 获取请求参数
    console.log('request param base64 =>', req.query.p);
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    if (param.requestType === 'position') {
    // 构建响应数据
      const lackTerInfo = [
    { name: 'd地区小区1北门', value: [114.31, 30.52] },
    { name: 'e地区小区1北门', value: [125.03, 46.58] },
      ];
      const data = mockjs.mock({
        rspCod: '200',
        rspMsg: 'success',
        rspList: lackTerInfo,
      });
      console.log('data =>', data);
      res.json(data);
    }
    if (param.requestType === 'table') {
      const currentPage = param.currentPage;
    // 构建响应数据
      const total = 22;
      const myDate = new Date();
      const Tim = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDay()} ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
      const list = [];
      for (let i = 0; i < 10; i++) {
        if (currentPage >= 3 && i > 1) {
          break;
        }
        list.push({
          lackId: `${i}`,
          terId: `${currentPage}${i}`,
          agtName: '张三',
          compName: '交通银行',
          commName: currentPage,
          lackTim: `${Tim}`,
          lackKeepTim: `${Tim}`,
          supplyTim: `${Tim}`,
          supplyPerson: '张三',
          warnCount: `${i}`,
          lastWarnTim: `${Tim}`,
        });
      }
      const data = mockjs.mock({
        rspCod: '200',
        rspMsg: 'success',
        total: total,
        rspList: list,
      });
      res.json(data);
    }
  },
};
