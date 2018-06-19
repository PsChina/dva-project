import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => {};

const StlBusinessPageTable = (props) => {
  const {
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange,
    tableRowSelect,
    handleDetailClick,
    handleStlDetailClick,
  } = props;

  const bizMap = i18n.bizMap('sms/stlBusiness');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const commonMap = i18n.commonMap();

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      { title: bizMap.stlDat, dataIndex: 'stlDat', width: 120 },
      {
        title: bizMap.busiTyp, dataIndex: 'busiTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = commonMap.internetwork; break;
            case '02': txt = commonMap.acquiring; break;
            case '03': txt = commonMap.scaning; break;
            case '04': txt = commonMap.prepaid; break;
            default: txt = bizMap.prepaid; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.clrTyp, dataIndex: 'clrTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = commonMap.individualMem; break;
            case '02': txt = commonMap.merchantman; break;
            case '03': txt = commonMap.store; break;
            case '04': txt = commonMap.terminal; break;
            default: txt = commonMap.individualMem; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.pyeMemName, dataIndex: 'pyeMemName', width: 80 },
      {
        title: bizMap.ccy, dataIndex: 'ccy', width: 120, render(text) {
          let txt = '';
          currency.forEach((v) => {
            if (v.value === text) {
              txt = v.label;
            }
          });
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.stlAmt, dataIndex: 'stlAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.begClrDat, dataIndex: 'begClrDat', width: 120 },
      { title: bizMap.endClrDat, dataIndex: 'endClrDat', width: 120 },
      { title: bizMap.txnTotCnt, dataIndex: 'txnTotCnt', width: 120 },
      { title: bizMap.txnTotAmt, dataIndex: 'txnTotAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.txnTotFee, dataIndex: 'txnTotFee', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.txnTotFee, dataIndex: 'payTotCnt', width: 120 },
      { title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleStlDetailClick(record); }}>{bizMap.stlDetlOper}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1100 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

StlBusinessPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,

  handleDetailClick: PropTypes.func,
};

StlBusinessPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,

  handleDetailClick: noop,
};

export default StlBusinessPageTable;
