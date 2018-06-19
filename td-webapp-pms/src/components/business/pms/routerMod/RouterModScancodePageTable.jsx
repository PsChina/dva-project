import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const RouterModScancodePageTable = (props) => {
  const { tableList, tableTotal, tableCurrentPage, tableFooter, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick } = props;
  const bizMap = i18n.bizMap('pms/routerMod');
  const commonMap = i18n.commonMap();
  const tableProps = {
    tableCheckbox: false,
    rowKey: record => record.modNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.modNo, dataIndex: 'modNo', width: 90 },
      { title: bizMap.modName, dataIndex: 'modName', width: 100 },
      {
        title: bizMap.txnChannel, dataIndex: 'txnChannel', width: 90, render(text) {
          let txt = '';
          switch (text) {
            case '0001': txt = bizMap['txnChannel-0001']; break;
            case '0002': txt = bizMap['txnChannel-0002']; break;
            case '0003': txt = bizMap['txnChannel-0003']; break;
            case '1011': txt = bizMap['txnChannel-1011']; break;
            case '1012': txt = bizMap['txnChannel-1012']; break;
            case '1014': txt = bizMap['txnChannel-1014']; break;
            case '1015': txt = bizMap['txnChannel-1015']; break;
            case '1016': txt = bizMap['txnChannel-1016']; break;
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
      {
        title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
    tableList: tableList,
    tableTotal: tableTotal,
    tableCurrentPage: tableCurrentPage,
    tableLoading: tableLoading,
    footer: tableFooter,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

RouterModScancodePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  tableFooter: PropTypes.func,
};

RouterModScancodePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  tableFooter: noop,
}

export default RouterModScancodePageTable;
