import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => { };

const StlBusinessAccDetailTable = (props) => {
  const {
        stlTableList,
        stlTableTotal,
        stlTableCurrentPage,
        stlTableLoading,
        tablePageChange,
  } = props;

  const bizMap = i18n.bizMap('sms/clearingSum');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      { title: bizMap.clrNum, dataIndex: 'id', width: 120 },
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
      {
        title: bizMap.busiTyp, dataIndex: 'busiTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['busiTyp-01']; break;
            case '02': txt = bizMap['busiTyp-02']; break;
            case '03': txt = bizMap['busiTyp-03']; break;
            case '04': txt = bizMap['busiTyp-04']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.pyeMemName, dataIndex: 'pyeMemName', width: 120 },
      {
        title: bizMap.ccy, dataIndex: 'ccyCod', width: 100, render(text) {
          let txt = '';
          currency.forEach((v) => {
            if (v.value === text) {
              txt = v.label;
            }
          });
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.clrDat, dataIndex: 'clrDat', width: 120 },
      { title: bizMap.txnTotCnt, dataIndex: 'txnTotCnt', width: 120 },
      {
        title: bizMap.txnTotAmt, dataIndex: 'txnTotAmt', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.txnTolFee, dataIndex: 'txnTolFee', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.stlDat, dataIndex: 'stlDat', width: 120 },
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
    ],
    scroll: { x: 1000 },
    tableList: stlTableList,
    tableTotal: stlTableTotal,
    tableCurrentPage: stlTableCurrentPage,
    tableLoading: stlTableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

StlBusinessAccDetailTable.propTypes = {
  stlTableList: PropTypes.array,
  stlTableTotal: PropTypes.number,
  stlTableCurrentPage: PropTypes.number,
  stlTableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

StlBusinessAccDetailTable.defaultProps = {
  stlTableList: [],
  stlTableTotal: 0,
  stlTableCurrentPage: 1,
  stlTableLoading: false,
  tablePageChange: noop,
};

export default StlBusinessAccDetailTable;
