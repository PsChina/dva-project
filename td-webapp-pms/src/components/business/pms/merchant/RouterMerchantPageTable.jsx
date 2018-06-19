import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const RouterMerchantPageTable = (props) => {
  const { tableList, tableTotal, tableCurrentPage, tableLoading, tablePageChange, tableRowSelect, handleDetailClick } = props;
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.merId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.merId, dataIndex: 'merId', width: 150 },
      { title: bizMap.merName, dataIndex: 'merName', width: 150 },
      { title: bizMap.merNo, dataIndex: 'merNo' },
      {
        title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{bizMap.currentRoute}</a>
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
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

RouterMerchantPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
};

RouterMerchantPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
}

export default RouterMerchantPageTable;
