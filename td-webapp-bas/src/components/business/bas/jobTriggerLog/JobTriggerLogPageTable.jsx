import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };
const JobTriggerLogPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, tableCurrentPage, handleMsgDetailClick } = props;
  const bizMap = i18n.bizMap('bas/jobTriggerLog');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.id,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.jobName, dataIndex: 'jobName', width: 100 },
      { title: bizMap.jobDesc, dataIndex: 'jobDesc', width: 100 },
      { title: bizMap.executorAddress, dataIndex: 'executorAddress', width: 100 },
      { title: bizMap.executorHandler, dataIndex: 'executorHandler', width: 100 },
      { title: bizMap.executorParam, dataIndex: 'executorParam', width: 100 },
      { title: bizMap.triggerTime, dataIndex: 'triggerTime', width: 100, render: text => formatDateString(text) },
      { title: bizMap.triggerStatus, dataIndex: 'triggerStatus', width: 100 },
      {
        title: bizMap.triggerMsg, dataIndex: 'triggerMsg', width: 100, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleMsgDetailClick(record); }}>{bizMap.showHandMsg}</a>
            </span>
          );
        },
      },
      { title: bizMap.handleTime, dataIndex: 'handleTime', width: 100, render: text => formatDateString(text) },
      { title: bizMap.handleStatus, dataIndex: 'handleStatus', width: 100 },
      {
        title: bizMap.handleMsg, dataIndex: 'handleMsg', render(text, record) {
          return (
            '无'
          );
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1280 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

JobTriggerLogPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleMsgDetailClick: PropTypes.func,
};

JobTriggerLogPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleMsgDetailClick: noop,
}

export default JobTriggerLogPageTable;
