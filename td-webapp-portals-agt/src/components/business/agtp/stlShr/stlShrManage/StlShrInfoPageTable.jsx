import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => { };

/**
 * 分润交易信息table
 */
const StlShrInfoPageTable = (props) => {
  const {
    stlShrtableList,
    stlShrtableLoading,
    stlShrtableTotal,
    stlShrtableCurrentPage,
    tablePageChange,
  } = props;
  const bizMap = i18n.bizMap('agtp/stlShr');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      { title: bizMap.chnId, dataIndex: 'CHN_ID', width: 120 },
      { title: bizMap.chnName, dataIndex: 'CHN_NAME', width: 120 },
      { title: bizMap.chkDat, dataIndex: 'CHK_DAT', width: 120 },
      {
        title: bizMap.txnId, dataIndex: 'TXN_ID', width: 100,
      },
      {
        title: bizMap.ttxnId, dataIndex: 'TTXN_ID', width: 120,
      },
      {
        title: bizMap.tmerNo, dataIndex: 'TMER_NO', width: 120,
      },
      {
        title: bizMap.ttermNo, dataIndex: 'TTERM_NO', width: 120,
      },
      {
        title: bizMap.txnDate, dataIndex: 'TXN_DATE', width: 120, render(text) {
          return date.formatDateString(text);
        },
      },
      {
        title: bizMap.txnTime, dataIndex: 'TXN_TIME', width: 120, render(text) {
          return date.formatDateString(text);
        },
      },
      {
        title: bizMap.ccyCod, dataIndex: 'CCY_COD', width: 120, render(text) {
          let txt = '';
          currency.forEach((v) => {
            if (v.value === text) {
              txt = v.label;
            }
          });
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.txnAmt, dataIndex: 'TXN_AMT', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.seqNo, dataIndex: 'SEQ_NO', width: 120 },
      {
        title: bizMap.batNo, dataIndex: 'BAT_NO', width: 120,
      },
      { title: bizMap.autCod, dataIndex: 'AUT_COD', width: 120 },
      { title: bizMap.txnType, dataIndex: 'TXN_TYPE', width: 120, render(text) {
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
      { title: bizMap.chnChkSts, dataIndex: 'CHN_CHK_STS', width: 120, render(text) {
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
      { title: bizMap.txnChannel, dataIndex: 'TXN_CHANNEL', width: 120, render(text) {
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
      { title: bizMap.txnFee, dataIndex: 'TXN_FEE', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.refAmt, dataIndex: 'REF_AMT', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.agtId, dataIndex: 'AGT_ID', width: 120 },
      {
        title: bizMap.agtName, dataIndex: 'AGT_NAME', width: 120,
      },
      {
        title: bizMap.merId, dataIndex: 'MER_ID', width: 120,
      },
      {
        title: bizMap.merNo, dataIndex: 'MER_NO', width: 120,
      },
      {
        title: bizMap.merName, dataIndex: 'MER_NAME', width: 120,
      },
        { title: bizMap.braId, dataIndex: 'BRA_ID', width: 120 },
      { title: bizMap.braName, dataIndex: 'BRA_NAME', width: 120 },
      { title: bizMap.clearStatus, dataIndex: 'CLEAR_STATUS', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['clearStatus-0']; break;
          case '1': txt = bizMap['clearStatus-1']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.stlStatus, dataIndex: 'STL_STATUS', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['stlStatus-0']; break;
          case '1': txt = bizMap['stlStatus-1']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.cleDat, dataIndex: 'CLE_DAT', width: 120, render(text) {
        return date.formatDateString(text);
      },
      },
      { title: bizMap.stlDat, dataIndex: 'STL_DAT', width: 120, render(text) {
        return date.formatDateString(text);
      },
      },
      { title: bizMap.txnStatus, dataIndex: 'TXN_STATUS', width: 120, render(text) {
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
    tableList: stlShrtableList,
    tableTotal: stlShrtableTotal,
    tableCurrentPage: stlShrtableCurrentPage,
    tableLoading: stlShrtableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

StlShrInfoPageTable.propTypes = {
  stlShrtableList: PropTypes.array,
  stlShrtableTotal: PropTypes.number,
  stlShrtableCurrentPage: PropTypes.number,
  stlShrtableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

StlShrInfoPageTable.defaultProps = {
  stlShrtableList: [],
  stlShrtableTotal: 0,
  stlShrtableCurrentPage: 1,
  stlShrtableLoading: false,
  tablePageChange: noop,
};

export default StlShrInfoPageTable;
