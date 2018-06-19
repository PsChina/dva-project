import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => {};

const StlAuditPageTable = (props) => {
  const {
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange,
    handleDetailClick,
    tableRowSelect,
  } = props;

  const bizMap = i18n.bizMap('sms/stling');
  const commonMap = i18n.commonMap();
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      { title: bizMap.stlDat, dataIndex: 'stlDat', width: 120, render(text) {
        const txt = date.formatDateString(text);
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.stlMod, dataIndex: 'stlMod', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['stlMod-c']; break;
          case '1': txt = bizMap['stlMod-n']; break;
          default: txt = '其它'; break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.stlTyp, dataIndex: 'stlTyp', width: 100, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['stlTyp-t']; break;
          case '1': txt = bizMap['stlTyp-d']; break;
          default: txt = ''; break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.clrTyp, dataIndex: 'clrTyp', width: 100, render(text) {
        let txt = '';
        switch (text) {
          case '01': txt = bizMap.individualMem; break;
          case '02': txt = bizMap.merchantman; break;
          case '03': txt = bizMap.store; break;
          case '04': txt = bizMap.terminal; break;
          default: txt = ''; break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.pyeMemName, dataIndex: 'pyeMemName', width: 150 },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 120, render(text) {
        let txt = '';
        currency.forEach((v) => {
          if (v.value === text) {
            txt = v.label;
          }
        });
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.stlAmt, dataIndex: 'stlAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.stlSts, dataIndex: 'stlSts', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap.stlSuccessSts; break;
          case '1': txt = bizMap.stlToAudit; break;
          case '2': txt = bizMap.stlAuditFail; break;
          case '3': txt = bizMap.stlToApplyForMoney; break;
          case '4': txt = bizMap.stlCancel; break;
          default: txt = ''; break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: commonMap.action, width: 50, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{bizMap.transferAudit}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 830 },
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

StlAuditPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,

  handleDetailClick: PropTypes.func,
};

StlAuditPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,

  handleDetailClick: noop,
};

export default StlAuditPageTable;
