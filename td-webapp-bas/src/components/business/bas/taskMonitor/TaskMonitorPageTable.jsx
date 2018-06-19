import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => {};

const TaskMonitorPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleViewProcessClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/taskMonitor');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.flowbusinesstoken,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.flowbusinesstoken, dataIndex: 'flowbusinesstoken', width: 100 },
      { title: bizMap.modelname, dataIndex: 'modelname', width: 100 },
      { title: bizMap.referbusinessname, dataIndex: 'referbusinessname', width: 150 },
      { title: bizMap.flowstatus, dataIndex: 'flowstatus', width: 100, render(text) {
        let txt = '';
        switch (text) {
          case '01': txt = commonMap['flowstatus-01']; break;
          case '02': txt = commonMap['flowstatus-02']; break;
          case '03': txt = commonMap['flowstatus-03']; break;
          case '06': txt = commonMap['flowstatus-06']; break;
          case '99': txt = commonMap['flowstatus-99']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.nextpositionname, dataIndex: 'nextpositionname', width: 100 },
      { title: bizMap.createdate, dataIndex: 'createdate', width: 100, render: text => formatDateString(text)  },
      { title: bizMap.referbusinessusername, dataIndex: 'referbusinessusername' },
      { title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleViewProcessClick(record); }}>{bizMap.toHistory}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1000 },
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

TaskMonitorPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleViewProcessClick: PropTypes.func,
};

TaskMonitorPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleViewProcessClick: noop,
}

export default TaskMonitorPageTable;
