import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const PubBankSubPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubBank');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.binctt + record.bankCode,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.bankCode, dataIndex: 'bankCode', width: 100 },
      { title: bizMap.subBranch, dataIndex: 'subBranch', width: 100 },
      { title: bizMap.countryName, dataIndex: 'countryName', width: 100 },
      { title: bizMap.provName, dataIndex: 'provName', width: 100 },
      { title: bizMap.cityName, dataIndex: 'cityName' },

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
    scroll: { x: 800 },
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

PubBankSubPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

PubBankSubPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default PubBankSubPageTable;
