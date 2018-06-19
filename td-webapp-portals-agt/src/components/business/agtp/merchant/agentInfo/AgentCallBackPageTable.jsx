import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const AgentCallBackPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback } = props;
  const bizMap = i18n.bizMap('agtp/agent');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.merId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.agtId, dataIndex: 'agtId', width: 100 },
      { title: bizMap.agtName, dataIndex: 'agtName', width: 100 },
      { title: bizMap.agtParentId, dataIndex: 'agtParentId', width: 100 },
      {
        title: bizMap.agtScope, dataIndex: 'agtScope', render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['agtScope-01']; break;
            case '02': txt = bizMap['agtScope-02']; break;
            case '03': txt = bizMap['agtScope-03']; break;
            case '04': txt = bizMap['agtScope-04']; break;
            default: txt = '';
          }
          return <span>{txt}</span>;
        },
      },
      { title: bizMap.bizSale, dataIndex: 'bizsaleId', width: 200 },
      { title: bizMap.addTim, dataIndex: 'addTim', width: 200 },
      {
        title: bizMap.agtStatus, dataIndex: 'agtStatus', render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
    ],
    scroll: { x: 1300 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    onRowClick(record) {
      rowClickCallback(record);
    },
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

AgentCallBackPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
};

AgentCallBackPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
}

export default AgentCallBackPageTable;
