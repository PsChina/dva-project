import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const PubExchangeRateInfoPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubExchangeRate');
  const tableProps = {
    rowKey: record => record.toCurrency,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.fromCurrency, dataIndex: 'fromCurrency', width: 80 },
      { title: bizMap.toCurrency, dataIndex: 'toCurrency', width: 80 },
      { title: bizMap.baseRate, dataIndex: 'baseRate', width: 150 },
      { title: bizMap.salePrice, dataIndex: 'salePrice', width: 150 },
      { title: bizMap.buyPrice, dataIndex: 'buyPrice', width: 150 },
      { title: bizMap.updateObj, dataIndex: 'updateObj', width: 80 },
      { title: bizMap.dataCollectingTime, dataIndex: 'dataCollectingTime', width: 150, render: (text) => { return formatDateString(text); } },
      { title: bizMap.createTime, dataIndex: 'createTime', width: 150, render: (text) => { return formatDateString(text); } },
    ],
    scroll: { x: 99 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tableCheckbox: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

PubExchangeRateInfoPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

PubExchangeRateInfoPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
}

export default PubExchangeRateInfoPageTable;
