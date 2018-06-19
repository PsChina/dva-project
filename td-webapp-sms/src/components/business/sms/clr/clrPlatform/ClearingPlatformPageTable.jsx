import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => { };

/**
 * 平台清分table list
 */
const ClearingPlatformPageTable = (props) => {
  const {
    tablePageChange,
    tablePlatformLoading,
    tablePlatformList,
    tablePlatformTotal,
    tablePlatformCurrentPage,
    handleDetailClick,
    handleTransactionDetailClick,
  } = props;
  const bizMap = i18n.bizMap('sms/clearingSum');
  const commonMap = i18n.commonMap();
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      {
        title: bizMap.clrDat, dataIndex: 'clrDat', width: 120, render(text) {
          return date.formatDateString(text);
        },
      },
      {
        title: bizMap.busiTyp, dataIndex: 'busiTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0001': txt = bizMap['busiTyp-01']; break;
            case '0002': txt = bizMap['busiTyp-02']; break;
            case '0003': txt = bizMap['busiTyp-03']; break;
            case '0004': txt = bizMap['busiTyp-04']; break;
            case '1011': txt = bizMap['busiTyp-05']; break;
            case '1012': txt = bizMap['busiTyp-06']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.clrTyp, dataIndex: 'clrTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['clrTyp-01']; break;
            case '02': txt = bizMap['clrTyp-02']; break;
            case '03': txt = bizMap['clrTyp-03']; break;
            case '04': txt = bizMap['clrTyp-04']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.pyeMemName, dataIndex: 'pyeMemName', width: 120 },
      {
        title: bizMap.ccy, dataIndex: 'ccy', width: 100, render(text) {
          let txt = '';
          currency.forEach((v) => {
            if (v.value === text) {
              txt = v.label;
            }
          });
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.txnTotCnt, dataIndex: 'txnTotCnt', width: 120 },
      {
        title: bizMap.txnTotAmt, dataIndex: 'txnTotAmt', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.txnTotFee, dataIndex: 'txnTotFee', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.stlDat, dataIndex: 'stlDat', width: 120, render(text) {
          return date.formatDateString(text);
        },
      },
      {
        title: bizMap.stlSts, dataIndex: 'stlSts', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['stlSts-01']; break;
            case '1': txt = bizMap['stlSts-02']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 80, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleTransactionDetailClick(record); }}>{bizMap.transactionDetail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
    tableList: tablePlatformList,
    tableTotal: tablePlatformTotal,
    tableCurrentPage: tablePlatformCurrentPage,
    tableLoading: tablePlatformLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} scroll={{ x: 1200 }} />);
}

ClearingPlatformPageTable.propTypes = {
  tablePlatformList: PropTypes.array,
  tablePlatformTotal: PropTypes.number,
  tablePlatformCurrentPage: PropTypes.number,
  tablePlatformLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,

  handleDetailClick: PropTypes.func,
  handleTransactionDetailClick: PropTypes.func,
};

ClearingPlatformPageTable.defaultProps = {
  tablePlatformList: [],
  tablePlatformTotal: 0,
  tablePlatformCurrentPage: 1,
  tablePlatformLoading: false,
  tablePageChange: noop,

  handleDetailClick: noop,
  handleTransactionDetailClick: noop,
};

export default ClearingPlatformPageTable;
