import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const TerminalMerPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleAddClick } = props;
  const bizMap = i18n.bizMap('agtp/terminalMer');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.braId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.braId, dataIndex: 'braId', width: 100 },
      { title: bizMap.braName, dataIndex: 'braName', width: 150 },
      { title: bizMap.merId, dataIndex: 'merId', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 150 },
      { title: bizMap.merNo, dataIndex: 'merNo' },
      {
        title: commonMap.action, width: 100, fixed: 'right', render(text, record) {
          return (
            <span>
              <a onClick={() => { handleAddClick(record); }}>{commonMap.bind}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 850 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

TerminalMerPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleAddClick: PropTypes.func,
};

TerminalMerPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleAddClick: noop,
}

export default TerminalMerPageTable;
