import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};

const QrPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableCurrentPage, clickCallback } = props;
  const bizMap = i18n.bizMap('rms/qr');
  const tableProps = {
    rowKey: record => record.qrId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.qrId, dataIndex: 'qrId', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },   
      { title: bizMap.storeName, dataIndex: 'storeName', width: 100},
      { title: bizMap.agtName, dataIndex: 'agtName', width: 100 },
      { title: bizMap.createUserName, dataIndex: 'createUserName', width: 100 },
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

QrPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

QrPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default QrPageTable;
