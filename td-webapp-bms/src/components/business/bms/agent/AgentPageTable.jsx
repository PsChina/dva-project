import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const AgentPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tableCurrentPage, tablePageChange, tableRowSelect, handleConfigClick } = props;
  const bizMap = i18n.bizMap('bms/agent');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.agtId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.agtId, dataIndex: 'agtId', width: 110 },
      { title: bizMap.agtName, dataIndex: 'agtName', width: 160 },
      { title: bizMap.agtParentName, dataIndex: 'agtParentName', width: 160 },
      {
        title: bizMap.agtType, dataIndex: 'agtType', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['agtType-0']; break;
            case '1': txt = bizMap['agtType-1']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.agtScope, dataIndex: 'agtScope', width: 110, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['agtScope-01']; break;
            case '02': txt = bizMap['agtScope-02']; break;
            case '03': txt = bizMap['agtScope-03']; break;
            case '04': txt = bizMap['agtScope-04']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      {
        title: bizMap.agtStatus, dataIndex: 'agtStatus', width: 210, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.bizSale, dataIndex: 'bizSale' },
      {
        title: commonMap.action, fixed: 'right', width: 220, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleConfigClick(record); }}>{bizMap.configBiz}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1240 },
    tableCheckbox: false,
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

AgentPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tableCurrentPage: PropTypes.number,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleConfigClick: PropTypes.func,
};

AgentPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tableCurrentPage: 1,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleConfigClick: noop,
}

export default AgentPageTable;
