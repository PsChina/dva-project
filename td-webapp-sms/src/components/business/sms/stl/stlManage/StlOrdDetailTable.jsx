import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => { };

const StlOrdDetailTable = (props) => {
  const {
        orderTableList,
        orderTableTotal,
        orderTableCurrentPage,
        orderTableLoading,
        tablePageChange,
  } = props;

  const bizMap = i18n.bizMap('sms/stling');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableProps = {
    rowKey: record => record.payChnLog,
    tableColumns: [
      { title: bizMap.ordId, dataIndex: 'ordId', width: 120 },
      { title: bizMap.ordNo, dataIndex: 'ordNo', width: 120 },
      { title: bizMap.merBatch, dataIndex: 'merBatch', width: 120 },
      { title: bizMap.sourceLogName, dataIndex: 'sourceLogName', width: 80 },
      { title: bizMap.sourceTypeZh, dataIndex: 'sourceTypeZh', width: 120 },
      { title: bizMap.sourceName, dataIndex: 'sourceName', width: 120 },
      { title: bizMap.targetLogName, dataIndex: 'targetLogName', width: 80 },
      { title: bizMap.targetTypeZh, dataIndex: 'targetTypeZh', width: 120 },
      { title: bizMap.targetName, dataIndex: 'targetName', width: 120 },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 120, render(text) {
        let txt = '';
        currency.forEach((v) => {
          if (v.value === text) {
            txt = v.label;
          }
        });
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.ordAmt, dataIndex: 'ordAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccy] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccy), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.creTim, dataIndex: 'creTim', width: 120, render(text) {
        const txt = date.formatDateString(text);
        return <span title={txt}>{txt}</span>;
      },
      },
    ],
    scroll: { x: 1000 },
    tableList: orderTableList,
    tableTotal: orderTableTotal,
    tableCurrentPage: orderTableCurrentPage,
    tableLoading: orderTableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

StlOrdDetailTable.propTypes = {
  orderTableList: PropTypes.array,
  orderTableTotal: PropTypes.number,
  orderTableCurrentPage: PropTypes.number,
  orderTableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

StlOrdDetailTable.defaultProps = {
  orderTableList: [],
  orderTableTotal: 0,
  orderTableCurrentPage: 1,
  orderTableLoading: false,
  tablePageChange: noop,
};

export default StlOrdDetailTable;
