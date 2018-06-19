import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const JobTriggerInfoPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleExcuteClick, handleDetailClick, handleUpdateClick, handlePauseClick, handleRecoveryClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/jobTriggerInfo');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.id,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.jobName, dataIndex: 'jobName', width: 100 },
      { title: bizMap.jobDesc, dataIndex: 'jobDesc', width: 150 },
      { title: bizMap.jobCron, dataIndex: 'jobCron', width: 100 },
      { title: bizMap.author, dataIndex: 'author', width: 150 },
      { title: bizMap.alarmThreshold, dataIndex: 'alarmThreshold', width: 80 },
      { title: bizMap.executorAddress, dataIndex: 'executorAddress', width: 170 },
      { title: bizMap.executorHandler, dataIndex: 'executorHandler', width: 150 },
      { title: bizMap.jobStatus, dataIndex: 'jobStatus' },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleExcuteClick(record); }}>{bizMap.excute}</a>
              <span className="ant-divider" />
              <a hidden={record.jobStatus !== 'NORMAL'} onClick={() => { handlePauseClick(record); }}>{bizMap.pause}</a>
              <a hidden={record.jobStatus === 'NORMAL'} onClick={() => { handleRecoveryClick(record); }}>{bizMap.recovery}</a>
            </span>
          );
        },
      },
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

JobTriggerInfoPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleExcuteClick: PropTypes.func,
  handlePauseClick: PropTypes.func,
  handleRecoveryClick: PropTypes.func,
};

JobTriggerInfoPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handlePauseClick: noop,
  handleRecoveryClick: noop,
}

export default JobTriggerInfoPageTable;
