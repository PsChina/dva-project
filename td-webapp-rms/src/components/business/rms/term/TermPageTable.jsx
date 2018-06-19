import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};

const TermPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableCurrentPage, clickCallback } = props;
  const bizMap = i18n.bizMap('rms/term');
  const tableProps = {
    rowKey: record => record.terId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terPhyNo, dataIndex: 'terPhyno', width: 100 },
      { title: bizMap.terNo, dataIndex: 'terNo', width: 80 },
      { title: bizMap.terAgtName, dataIndex: 'terAgtName', width: 100 },
      { title: bizMap.terMerName, dataIndex: 'terMerName', width: 100 },
      { title: bizMap.terBraName, dataIndex: 'terBraName', width: 100 },
      { title: bizMap.terStatus, dataIndex: 'terStatue', width: 100, render: (text) => {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['terStatus-0']; break;
          case '1': txt = bizMap['terStatus-1']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
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

TermPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

TermPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default TermPageTable;
