import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => {};

const MerPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableCurrentPage, clickCallback } = props;
  const bizMap = i18n.bizMap('pms/mer');
  const tableProps = {
    rowKey: record => record.merId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.merId, dataIndex: 'merId', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },
      { title: bizMap.merEmail, dataIndex: 'merEmail', width: 100 },
      { title: bizMap.merNo, dataIndex: 'merNo', width: 100 },
      { title: bizMap.merType, dataIndex: 'merType', width: 100, render: (text) => {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['merType-0']; break;
          case '1': txt = bizMap['merType-1']; break;
          case '2': txt = bizMap['merType-2']; break;
          case '3': txt = bizMap['merType-3']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.agtId, dataIndex: 'agtId', width: 100 },
    ],
    scroll: { y: 240 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    onRowClick(record) {
      clickCallback(record);
    },
  };
  return (<PageTable {...tableProps} />);
};

MerPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

MerPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default MerPageTable;
