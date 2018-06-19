import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const TerminalLogPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick } = props;
  const bizMap = i18n.bizMap('tms/terminalLog');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();

  const tableProps = {
    rowKey: record => record.optLogno,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terId, dataIndex: 'terId', width: 200 },
      { title: bizMap.optTerPhyno, dataIndex: 'optTerPhyno', width: 200 },
      { title: bizMap.terNo, dataIndex: 'terNo', width: 200 },
      {
        title: bizMap.optStep, dataIndex: 'optStep', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = dataMap['optStep-0']; break;
            case '1': txt = dataMap['optStep-1']; break;
            case '2': txt = dataMap['optStep-2']; break;
            case '3': txt = dataMap['optStep-3']; break;
            case '4': txt = dataMap['optStep-4']; break;
            case '5': txt = dataMap['optStep-5']; break;
            case '6': txt = dataMap['optStep-6']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.optOrg, dataIndex: 'optOrg', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['org-1']; break;
            case '2': txt = commonMap['org-2']; break;
            case '3': txt = commonMap['org-3']; break;
            case '4': txt = commonMap['org-4']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.optObj, dataIndex: 'optObj', width: 100 },
      { title: bizMap.optDat, dataIndex: 'optDat', render: text => formatDateString(text) },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

TerminalLogPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
};

TerminalLogPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
}

export default TerminalLogPageTable;
