import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => { };

/**
 * 划款记录table list
 */
const StlOrderInfoPageTable = (props) => {
  const {
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange,
    handleDetailClick,
    handleOutClick,
    tableRowSelect,
  } = props;
  const bizMap = i18n.bizMap('sms/stlOrder');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const commonMap = i18n.commonMap();

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      {
        title: bizMap.outDate, dataIndex: 'outDate', width: 120, render(text) {
          return date.formatDateString(text);
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
        title: bizMap.stlWay, dataIndex: 'stlWay', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['stlWay-01']; break;
            case '02': txt = bizMap['stlWay-02']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
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
      {
        title: bizMap.outAmt, dataIndex: 'outAmt', width: 120, render(text, record) {
          const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.outBank, dataIndex: 'outBank', width: 120 },
      { title: bizMap.outBankName, dataIndex: 'outBankName', width: 120 },
      { title: bizMap.outAcc, dataIndex: 'outAcc', width: 120 },
      { title: bizMap.outAccName, dataIndex: 'outAccName', width: 120 },
      {
        title: bizMap.outSts, dataIndex: 'outSts', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['outSts-01']; break;
            case '1': txt = bizMap['outSts-02']; break;
            case '2': txt = bizMap['outSts-03']; break;
            case '3': txt = bizMap['outSts-04']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 80, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              {
                record.outSts === '1' ? <span className="ant-divider" /> : null
              }
              {
                record.outSts === '1' ? <a onClick={() => { handleOutClick(record); }}>{bizMap.outAmtOperating}</a> : null
              }
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tableCheckbox: true,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} scroll={{ x: 1440 }} />);
}

StlOrderInfoPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  handleDetailClick: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleOutClick: PropTypes.func,
};

StlOrderInfoPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  handleDetailClick: noop,
  tableRowSelect: noop,
  handleOutClick: noop,
};

export default StlOrderInfoPageTable;
