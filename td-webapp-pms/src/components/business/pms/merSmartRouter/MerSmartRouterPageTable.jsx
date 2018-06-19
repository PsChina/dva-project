import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const MerSmartRouterPageTable = (props) => {
  const { tableList, tableTotal, tableCurrentPage, tableLoading, tablePageChange, tableRowSelect } = props;
  const bizMap = i18n.bizMap('pms/smartRoute');
  const modBizMap = i18n.bizMap('pms/routerMod');
  // const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => (record.merId + record.txnChannel),
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.merId, dataIndex: 'merId', width: 150 },
      { title: bizMap.merName, dataIndex: 'merName', width: 150 },
      { title: bizMap.merNo, dataIndex: 'merNo', width: 150 },
      {
        title: modBizMap.txnChannel, dataIndex: 'txnChannel', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0001': txt = modBizMap['txnChannel-0001']; break;
            case '0002': txt = modBizMap['txnChannel-0002']; break;
            case '0003': txt = modBizMap['txnChannel-0003']; break;
            case '1011': txt = modBizMap['txnChannel-1011']; break;
            case '1012': txt = modBizMap['txnChannel-1012']; break;
            case '1014': txt = modBizMap['txnChannel-1014']; break;
            case '1015': txt = modBizMap['txnChannel-1015']; break;  
            case '1016': txt = modBizMap['txnChannel-1016']; break;                 
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.smartRoute, dataIndex: 'smartRoute', render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['smartRoute-1']; break;
            case '0': txt = bizMap['smartRoute-0']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      // {
      //   title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
      //     return (
      //       <span>
      //         <a onClick={() => { handleDeleteClick(record); }}>{commonMap.delete}</a>
      //       </span>
      //     );
      //   },
      // },
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
}

MerSmartRouterPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

MerSmartRouterPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
}

export default MerSmartRouterPageTable;
