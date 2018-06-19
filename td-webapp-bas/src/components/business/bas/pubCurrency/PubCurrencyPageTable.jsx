import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const PubCountryPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubCurrency');
  const countryBizMap = i18n.bizMap('bas/pubCountry');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.currencyId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: countryBizMap.country, dataIndex: 'country', width: 150 },
      { title: countryBizMap.countryCode, dataIndex: 'countryCode', width: 100 },
      { title: countryBizMap.countryShortName, dataIndex: 'countryShortName', width: 100 },
      { title: bizMap.currencyName, dataIndex: 'currencyName', width: 150 },
      { title: bizMap.currencyCode, dataIndex: 'currencyCode', width: 100 },
      { title: bizMap.currencyShortName, dataIndex: 'currencyShortName', width: 100 },
      { title: bizMap.currencyAbbreviations, dataIndex: 'currencyAbbreviations', width: 100 },
      { title: bizMap.decimalDigit, dataIndex: 'decimalDigit', width: 200 },
      {
        title: bizMap.status, dataIndex: 'status', render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['status-1']; break;
            case '0': txt = bizMap['status-0']; break;
            default: break;
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1200 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

PubCountryPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

PubCountryPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
}

export default PubCountryPageTable;
