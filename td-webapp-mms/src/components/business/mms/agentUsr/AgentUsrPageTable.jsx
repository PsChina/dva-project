import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const AgentUsrPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleShowRoleAssign,
  handleUpdateClick } = props;
  const bizMap = i18n.bizMap('mms/agent');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.usrId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.usrId, dataIndex: 'usrId', width: 100 },
      { title: bizMap.usrName, dataIndex: 'usrName', width: 100 },
      { title: bizMap.usrRealName, dataIndex: 'usrRealName', width: 100 },
      { title: bizMap.usrStatus, dataIndex: 'usrStatus', width: 100, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: txt = '';
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: bizMap.agtId, dataIndex: 'agtId', width: 100 },
      { title: bizMap.usrEmail, dataIndex: 'usrEmail', width: 100 },
      { title: bizMap.usrMobile, dataIndex: 'usrMobile', width: 100 },
      { title: bizMap.usrDesc, dataIndex: 'usrDesc' },
      { title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1280 },
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

AgentUsrPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleShowRoleAssign: PropTypes.func,
};

AgentUsrPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleShowRoleAssign: noop,
}

export default AgentUsrPageTable;
