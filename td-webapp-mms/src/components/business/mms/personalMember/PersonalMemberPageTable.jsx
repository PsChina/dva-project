import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const PersonalMemberPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick } = props;
  const bizMap = i18n.bizMap('mms/personalMember');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.id,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.userName, dataIndex: 'userName', width: 100 },
      { title: bizMap.realName, dataIndex: 'realName', width: 100 },
      { title: bizMap.mobile, dataIndex: 'mobile', width: 120 },
      { title: bizMap.email, dataIndex: 'email', width: 200 },
      { title: bizMap.birthday, dataIndex: 'birthday', width: 100 },
      { title: bizMap.certificateType, dataIndex: 'certificateType', width: 120 },
      { title: bizMap.certificateNo, dataIndex: 'certificateNo', width: 200 },
      { title: bizMap.status, dataIndex: 'status', render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: txt = '';
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1620 },
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

PersonalMemberPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

PersonalMemberPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default PersonalMemberPageTable;
