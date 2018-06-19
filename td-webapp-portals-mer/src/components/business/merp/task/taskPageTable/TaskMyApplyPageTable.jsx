import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';

const noop = () => { };

const TaskMyApplyPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleAuditHisClick } = props;
  const bizMap = i18n.bizMap('merp/task');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.flowstatusno,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.flowbusinesstoken, dataIndex: 'flowbusinesstoken', width: 200 },
      { title: bizMap.modelname, dataIndex: 'modelname', width: 200 },
      { title: bizMap.referbusinessname, dataIndex: 'referbusinessname', width: 200 },
      { title: bizMap.nextpositionname, dataIndex: 'nextpositionname', width: 200 },
      { title: bizMap.createdate, dataIndex: 'createdate', width: 200, render: (text) => { return formatDateString(text); } },
      {
        title: bizMap.flowstatus, dataIndex: 'flowstatus', render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['flowstatus-01']; break;
            case '02': txt = bizMap['flowstatus-02']; break;
            case '03': txt = bizMap['flowstatus-03']; break;
            case '06': txt = bizMap['flowstatus-06']; break;
            case '99': txt = bizMap['flowstatus-99']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleAuditHisClick(record); }}>{bizMap.auditHis}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1350 },
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

TaskMyApplyPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleAuditHisClick: PropTypes.func,
};

TaskMyApplyPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleAuditHisClick: noop,
}

export default TaskMyApplyPageTable;
