import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => { };

/**
 * 结算交易信息table
 */
const StlTradeTable = (props) => {
  const {
    stlTradetableList,
    stlTradetableLoading,
    stlTradetableTotal,
    stlTradetableCurrentPage,
    tablePageChange,
  } = props;
  const bizMap = i18n.bizMap('sms/stling');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      { title: bizMap.chnId, dataIndex: 'chnId', width: 120 },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 120 },
      { title: bizMap.chkDat, dataIndex: 'chkDat', width: 120 },
      {
        title: bizMap.txnId, dataIndex: 'txnId', width: 100,
      },
      {
        title: bizMap.ttxnId, dataIndex: 'ttxnId', width: 120,
      },
      {
        title: bizMap.tmerNo, dataIndex: 'tmerNo', width: 120,
      },
      {
        title: bizMap.ttermNo, dataIndex: 'ttermNo', width: 120,
      },
      {
        title: bizMap.txnTime, dataIndex: 'txnTime', width: 120, render(text, record) {
          const txt = date.formatDateString(`${record.txnDate}${record.txnTime}`);
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.ccyCod, dataIndex: 'ccyCod', width: 120, render(text) {
          let txt = '';
          currency.forEach((v) => {
            if (v.value === text) {
              txt = v.label;
            }
          });
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.txnAmt, dataIndex: 'txnAmt', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.seqNo, dataIndex: 'seqNo', width: 120 },
      {
        title: bizMap.batNo, dataIndex: 'batNo', width: 120,
      },
      { title: bizMap.autCod, dataIndex: 'autCod', width: 120 },
      {
        title: bizMap.txnType, dataIndex: 'txnType', width: 120, render(text) {
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
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.chnChkSts, dataIndex: 'chnChkSts', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['chnChkSts-00']; break;
            case '01': txt = bizMap['chnChkSts-01']; break;
            case '02': txt = bizMap['chnChkSts-02']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.txnChannel, dataIndex: 'txnChannel', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0001': txt = bizMap['txnChannel-01']; break;
            case '0002': txt = bizMap['txnChannel-02']; break;
            case '0003': txt = bizMap['txnChannel-03']; break;
            case '0004': txt = bizMap['txnChannel-04']; break;
            case '1011': txt = bizMap['txnChannel-05']; break;
            case '1012': txt = bizMap['txnChannel-06']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.txnFee, dataIndex: 'txnFee', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.refAmt, dataIndex: 'refAmt', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.agtId, dataIndex: 'agtId', width: 120 },
      {
        title: bizMap.agtName, dataIndex: 'agtName', width: 120,
      },
      {
        title: bizMap.merId, dataIndex: 'merId', width: 120,
      },
      {
        title: bizMap.merNo, dataIndex: 'merNo', width: 120,
      },
      {
        title: bizMap.merName, dataIndex: 'merName', width: 120,
      },
      { title: bizMap.braId, dataIndex: 'braId', width: 120 },
      { title: bizMap.braName, dataIndex: 'braName', width: 120 },
      {
        title: bizMap.clearStatus, dataIndex: 'clearStatus', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['clearStatus-0']; break;
            case '1': txt = bizMap['clearStatus-1']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.stlStatus, dataIndex: 'stlStatus', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['stlStatus-0']; break;
            case '1': txt = bizMap['stlStatus-1']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.cleDat, dataIndex: 'cleDat', width: 120, render(text) {
          return date.formatDateString(text);
        },
      },
      {
        title: bizMap.stlDat, dataIndex: 'stlDat', width: 120, render(text) {
          return date.formatDateString(text);
        },
      },
      {
        title: bizMap.txnStatus, dataIndex: 'txnStatus', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['txnStatus-01']; break;
            case 'S': txt = bizMap['txnStatus-02']; break;
            case 'F': txt = bizMap['txnStatus-03']; break;
            case 'C': txt = bizMap['txnStatus-04']; break;
            case 'R': txt = bizMap['txnStatus-05']; break;
            case 'T': txt = bizMap['txnStatus-06']; break;
            case 'E': txt = bizMap['txnStatus-07']; break;
            case 'P': txt = bizMap['txnStatus-08']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
    ],
    scroll: { x: true },
    tableList: stlTradetableList,
    tableTotal: stlTradetableTotal,
    tableCurrentPage: stlTradetableCurrentPage,
    tableLoading: stlTradetableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

StlTradeTable.propTypes = {
  stlTradetableList: PropTypes.array,
  stlTradetableTotal: PropTypes.number,
  stlTradetableCurrentPage: PropTypes.number,
  stlTradetableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

StlTradeTable.defaultProps = {
  stlTradetableList: [],
  stlTradetableTotal: 0,
  stlTradetableCurrentPage: 1,
  stlTradetableLoading: false,
  tablePageChange: noop,
};

export default StlTradeTable;
