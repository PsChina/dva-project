import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};

const MccPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableCurrentPage, clickCallback } = props;
  const bizMap = i18n.bizMap('rms/mcc');
  const tableProps = {
    rowKey: record => record.mccCode,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.mccCode, dataIndex: 'mccCode', width: 80 },
      { title: bizMap.mccCls, dataIndex: 'mccCls', width: 250 },
    ],
    scroll: { y: 240 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    onRowClick(record) {
      clickCallback(record);
    },
  };
  return (<PageTable {...tableProps} />);
};

MccPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

MccPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default MccPageTable;
