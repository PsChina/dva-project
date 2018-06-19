import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};

const StorePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableCurrentPage, clickCallback } = props;
  const bizMap = i18n.bizMap('rms/store');
  const tableProps = {
    rowKey: record => record.braId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.braId, dataIndex: 'braId', width: 100 },
      { title: bizMap.braName, dataIndex: 'braName', width: 100 },
      { title: bizMap.braShortName, dataIndex: 'braShortName', width: 100 },
      { title: bizMap.braStatus, dataIndex: 'braStatus', width: 100, render: (text) => {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['braStatus-0']; break;
          case '1': txt = bizMap['braStatus-1']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.merId, dataIndex: 'merId', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },
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

StorePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

StorePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default StorePageTable;
