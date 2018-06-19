import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
// import { formatDateString } from '../../../../utils/date';

const noop = () => {};

const WarnPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('rms/warnGroup');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.grpId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.groupName, dataIndex: 'grpName' },
      { title: bizMap.grpOrgId, dataIndex: 'grpOrgId',
        render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = commonMap['grpOrgId-01']; break;
            case '02': txt = commonMap['grpOrgId-02']; break;
            case '01,02': txt = `${commonMap['grpOrgId-01']},${commonMap['grpOrgId-02']}`; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
          </span>
        );
      } },
    ],
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

WarnPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

WarnPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
}

export default WarnPageTable;
