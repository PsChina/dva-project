import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const SubBankCallBackPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback } = props;
  const bizMap = i18n.bizMap('mms/agent');
  const tableProps = {
    rowKey: record => record.merId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.bankName, dataIndex: 'bankName', width: 100 },
      { title: bizMap.subBranch, dataIndex: 'subBranch', width: 100 },
      { title: bizMap.bankCode, dataIndex: 'bankCode', width: 100 },
    ],
    scroll: { x: 900, y: 300 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    onRowClick(record) {
      rowClickCallback(record);
    },
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

SubBankCallBackPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
};

SubBankCallBackPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
}

export default SubBankCallBackPageTable;
