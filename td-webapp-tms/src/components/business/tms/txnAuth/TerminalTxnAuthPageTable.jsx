import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalTxnAuthPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick } = props;
  const bizMap = i18n.bizMap('tms/terminalTxnAuth');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.txnAuthNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.txnAuthNo, dataIndex: 'txnAuthNo', width: 150 },
      { title: bizMap.txnAuthName, dataIndex: 'txnAuthName', width: 120 },
      {
        title: bizMap.txnStatus, dataIndex: 'txnStatus', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.txnDesc, dataIndex: 'txnDesc' },
      {
        title: bizMap.txnType, dataIndex: 'txnType', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['type-1']; break;
            case '2': txt = commonMap['type-2']; break;
            case '3': txt = commonMap['type-3']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1080 },
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

TerminalTxnAuthPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

TerminalTxnAuthPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
}

export default TerminalTxnAuthPageTable;
