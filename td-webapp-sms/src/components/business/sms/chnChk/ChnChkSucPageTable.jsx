import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => {};

const ChnChkSucPageTable = (props) => {
  const {
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange,
  } = props;

  const bizMap = i18n.bizMap('sms/chnChkSum');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableColumns = [
    { title: bizMap.chnName, dataIndex: 'chnName', width: 120 },
    { title: bizMap.chkDat, dataIndex: 'chkDat', width: 100, render(text) {
      const txt = date.formatDateString(text);
      return <span title={txt}>{txt}</span>;
    } },
    { title: bizMap.txnId, dataIndex: 'txnId', width: 120 },
    { title: bizMap.ttxnId, dataIndex: 'ttxnId', width: 120 },
    { title: bizMap.tmerNo, dataIndex: 'tmerNo', width: 120 },
    { title: bizMap.ttermNo, dataIndex: 'ttermNo', width: 120 },
    { title: bizMap.txnTime, dataIndex: 'txnTime', width: 120, render(text, record) {
      const txt = date.formatDateString(`${record.txnDate}${record.txnTime}`);
      return <span title={txt}>{txt}</span>;
    } },
    { title: bizMap.txnChannel, dataIndex: 'txnChannel', width: 80, render(text) {
      let txt = '';
      switch (text) {
        case '0001': txt = bizMap['txnChannel-0001']; break;
        case '0002': txt = bizMap['txnChannel-0002']; break;
        case '0003': txt = bizMap['txnChannel-0003']; break;
        case '0004': txt = bizMap['txnChannel-0004']; break;
        case '1011': txt = bizMap['txnChannel-1011']; break;
        case '1012': txt = bizMap['txnChannel-1012']; break;
        default: break;
      }
      return <span title={txt}>{txt}</span>;
    } },
    { title: bizMap.ccyCod, dataIndex: 'ccyCod', width: 120, render(text) {
      let txt = '';
      currency.forEach((v) => {
        if (v.value === text) {
          txt = v.label;
        }
      });
      return <span title={txt}>{txt}</span>;
    } },
    { title: bizMap.txnAmt, dataIndex: 'txnAmt', width: 120, render(text, record) {
      const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
      const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
      return <span title={txt}>{txt}</span>;
    } },
    { title: bizMap.seqNo, dataIndex: 'seqNo', width: 120 },
    { title: bizMap.batNo, dataIndex: 'batNo', width: 120 },
    { title: bizMap.autCod, dataIndex: 'autCod', width: 120 },
    { title: bizMap.txnType, dataIndex: 'txnType', width: 80, render(text) {
      let txt = '';
      switch (text) {
        case 'A': txt = bizMap['txnType-A']; break;
        case 'S': txt = bizMap['txnType-S']; break;
        case 'C': txt = bizMap['txnType-C']; break;
        case 'R': txt = bizMap['txnType-R']; break;
        case 'P': txt = bizMap['txnType-P']; break;
        case 'T': txt = bizMap['txnType-T']; break;
        case 'U': txt = bizMap['txnType-U']; break;
        case 'M': txt = bizMap['txnType-M']; break;
        case 'E': txt = bizMap['txnType-E']; break;
        default: break;
      }
      return <span title={txt}>{txt}</span>;
    } },
  ];

  const tableProps = {
    rowKey: record => `${record.chnId}${record.chnBuzType}${record.chkDat}${record.txnId}${record.ttxnId}${record.tmerNo}${record.ttermNo}${record.seqNo}${record.batNo}${record.autCod}`,
    tableColumns: tableColumns,
    scroll: { x: 1024 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },
  }

  return (<PageTable {...tableProps} />);
}

ChnChkSucPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

ChnChkSucPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
};

export default ChnChkSucPageTable;
