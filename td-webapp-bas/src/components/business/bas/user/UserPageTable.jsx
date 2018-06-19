import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => {};

const UserPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, handleResetPwdClick, handleUnLockClick, tableCurrentPage, handleQueryUsrRoleClick } = props;
  const bizMap = i18n.bizMap('bas/user');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.usrId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.chnId, dataIndex: 'chnId', width: 150 },
      { title: bizMap.usrName, dataIndex: 'usrName', width: 100 },
      { title: bizMap.usrRealName, dataIndex: 'usrRealName', width: 100 },
      { title: bizMap.orgName, dataIndex: 'orgName', width: 150 },
      { title: bizMap.usrStatus, dataIndex: 'usrStatus', width: 80, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: break;
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>
      } },
      { title: bizMap.lastLoginTime, dataIndex: 'lastLoginTime', width: 170, render: (text) => { return formatDateString(text); } },
      { title: bizMap.failLoginTimes, dataIndex: 'failLoginTimes', width: 150, render: (text) => { return formatDateString(text); } },
      { title: bizMap.isLock, dataIndex: 'isLock', width: 80, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['check-0']; break;
          case '1': txt = commonMap['check-1']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.creObjName, dataIndex: 'creObj', width: 100 },
      { title: bizMap.creTim, dataIndex: 'creTim', render: (text) => { return formatDateString(text); } },
      { title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleResetPwdClick(record); }}>{bizMap.resetPwd}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleUnLockClick(record); }}>{bizMap.unLock}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleQueryUsrRoleClick(record); }}>{bizMap.assignRole}</a>
          </span>
        );
      } },
    ],
    scroll: { x: true },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

UserPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleResetPwdClick: PropTypes.func,
  handleUnLockClick: PropTypes.func,
  handleQueryUsrRoleClick: PropTypes.func,
};

UserPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleResetPwdClick: noop,
  handleUnLockClick: noop,
  handleQueryUsrRoleClick: noop,
}

export default UserPageTable;
