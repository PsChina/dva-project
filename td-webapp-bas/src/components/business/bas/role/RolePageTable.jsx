import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => {};

const RolePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, handleQueryRoleMenuClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/role');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.roleId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.chnId, dataIndex: 'chnId', width: 150 },
      { title: bizMap.roleName, dataIndex: 'roleName', width: 100 },
      { title: bizMap.isUse, dataIndex: 'isUse', width: 100, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: break;
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>
      } },
      { title: bizMap.sysFrom, dataIndex: 'sysName', width: 150 },
      { title: bizMap.creObjName, dataIndex: 'creObj', width: 150 },
      { title: bizMap.creTim, dataIndex: 'creTim', width: 150, render: (text) => { return formatDateString(text); } },
      { title: bizMap.updObjName, dataIndex: 'updObj', width: 150 },
      { title: bizMap.updTim, dataIndex: 'updTim', render: (text) => { return formatDateString(text); } },
      { title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleQueryRoleMenuClick(record); }}>{bizMap.routeAuth}</a>
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

RolePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleQueryRoleMenuClick: PropTypes.func,
};

RolePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleQueryRoleMenuClick: noop,
}

export default RolePageTable;
