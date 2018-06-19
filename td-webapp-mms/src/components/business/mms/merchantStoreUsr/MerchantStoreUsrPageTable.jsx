import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const MerchantStoreUsrPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleShowRoleAssign,
  handleUpdateClick } = props;
  const bizMap = i18n.bizMap('mms/merchantStore');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.usrId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.usrId, dataIndex: 'usrId', width: 120 },
      { title: bizMap.braUser, dataIndex: 'braUser', width: 120 },
      { title: bizMap.braRole, dataIndex: 'braRole', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '1': txt = bizMap['braRole-0']; break;
          case '2': txt = bizMap['braRole-1']; break;
          default: txt = '';
        }
        return <span>{txt}</span>;
      } },
      { title: bizMap.merId, dataIndex: 'merId', width: 120 },
      { title: bizMap.braUserName, dataIndex: 'braUserName', width: 120 },
      { title: bizMap.braName, dataIndex: 'braName' },
      { title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
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

MerchantStoreUsrPageTable.propTypes = {
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

MerchantStoreUsrPageTable.defaultProps = {
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

export default MerchantStoreUsrPageTable;
