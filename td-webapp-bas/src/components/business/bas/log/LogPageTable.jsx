import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const LogPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/log');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.usrId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.path, dataIndex: 'path', width: 300 },
      { title: bizMap.date, dataIndex: 'date', width: 100, render: text => formatDateString(text) },
      { title: bizMap.className, dataIndex: 'className', width: 150 },
      { title: bizMap.logLevel, dataIndex: 'logLevel', width: 100 },
      { title: bizMap.detail, dataIndex: 'detail' },
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
    scroll: { x: 800 },
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

LogPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
};

LogPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
}

export default LogPageTable;
