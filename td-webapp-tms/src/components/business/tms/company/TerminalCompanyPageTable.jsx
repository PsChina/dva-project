import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalCompanyPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick } = props;
  const bizMap = i18n.bizMap('tms/terminalCompany');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.copId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.copNam, dataIndex: 'copNam', width: 150 },
      { title: bizMap.copShNam, dataIndex: 'copShNam', width: 120 },
      { title: bizMap.copContacts, dataIndex: 'copContacts', width: 120 },
      { title: bizMap.copTel, dataIndex: 'copTel', width: 120 },
      { title: bizMap.copAddr, dataIndex: 'copAddr', width: 120 },
      { title: bizMap.copDesc, dataIndex: 'copDesc' },
      { title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1080 },
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

TerminalCompanyPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

TerminalCompanyPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default TerminalCompanyPageTable;
