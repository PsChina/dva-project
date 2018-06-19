import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const MerchantStoreRolePageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleShowRoleAssign,
  handleUpdateClick } = props;
  const bizMap = i18n.bizMap('mms/merchantStore');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.roleId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.roleId, dataIndex: 'roleId', width: 80 },
      { title: bizMap.roleName, dataIndex: 'roleName', width: 80 },
      { title: bizMap.isUse, dataIndex: 'isUse', width: 80, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: txt = '';
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: bizMap.creTim, dataIndex: 'creTim', width: 80 },
      { title: bizMap.creObj, dataIndex: 'creObj', width: 80 },
      { title: bizMap.updTim, dataIndex: 'updTim', width: 80 },
      { title: bizMap.updObj, dataIndex: 'updObj', width: 80 },
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

MerchantStoreRolePageTable.propTypes = {
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

MerchantStoreRolePageTable.defaultProps = {
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

export default MerchantStoreRolePageTable;
