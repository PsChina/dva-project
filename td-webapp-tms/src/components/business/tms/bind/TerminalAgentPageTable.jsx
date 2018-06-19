import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalAgentPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleAddClick } = props;
  const bizMap = i18n.bizMap('tms/terminalAgent');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.agtId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.agtId, dataIndex: 'agtId', width: 100 },
      { title: bizMap.agtName, dataIndex: 'agtName' },
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
    scroll: { x: 450 },
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

TerminalAgentPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleAddClick: PropTypes.func,
};

TerminalAgentPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleAddClick: noop,
}

export default TerminalAgentPageTable;
