const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/tms/params'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const total = 5;
    const list = [];
    const item1 = {
      tempId: 'TMP001',
      itemCode: '001001',
      itemName: '主密钥成分',
      itemField: '62',
      itemType: '3',
      itemLenType: '1',
      itemLength: '6',
      itemAlign: '1',
      itemSup: '0',
      itemOrder: '1',
    };
    const item2 = {
      tempId: 'TMP001',
      itemCode: '001002',
      itemName: '传输密钥',
      itemField: '62',
      itemType: '3',
      itemLenType: '1',
      itemLength: '32',
      itemAlign: '1',
      itemSup: '0',
      itemOrder: '2',
    };
    const item3 = {
      tempId: 'TMP001',
      itemCode: '002001',
      itemName: '启用消费',
      itemField: '62',
      itemType: '1',
      itemLenType: '1',
      itemLength: '1',
      itemAlign: '1',
      itemSup: '0',
      itemOrder: '3',
    };
    list.push(item1);
    list.push(item2);
    list.push(item3);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },

  'POST /rest/tms/param'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'DELETE /rest/tms/param/001001'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/tms/param/002001/up'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'PUT /rest/tms/param/001001/down'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
