const mockjs = require('mockjs');

module.exports = {
  'GET /rest/agtp/common/banks/select'(req, res) {
    const banklist = [
      { label: '中国银行', value: 'stlBank-01' },
      { label: '中国农业银行', value: 'stlBank-02' },
      { label: '中国工商银行', value: 'stlBank-03' },
      { label: '中国建设银行', value: 'stlBank-04' },
      { label: '中国交通银行', value: 'stlBank-05' },
      { label: '招商银行', value: 'stlBank-06' },
    ];
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: banklist,
    });
    res.json(data);
  },
  'GET /rest/agtp/common/bizSales/select'(req, res) {
    const bizSaleList = [
      { label: '张山', value: 'bizSale-01' },
      { label: '李小四', value: 'bizSale-02' },
      { label: '王小五', value: 'bizSale-03' },
      { label: '钱小六', value: 'bizSale-04' },
      { label: '赵小七', value: 'bizSale-05' },
      { label: '孙晓箫', value: 'bizSale-06' },
    ];
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: bizSaleList,
    });
    res.json(data);
  },
  'GET /rest/agtp/common/sysInfo/select'(req, res) {
    const sysInfoList = [
      { label: '线下收单系统', value: '011' },
      { label: '互联网系统', value: '010' },
      { label: '扫码', value: '012' },
    ];
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      rspData: sysInfoList,
    });
    res.json(data);
  },
};
