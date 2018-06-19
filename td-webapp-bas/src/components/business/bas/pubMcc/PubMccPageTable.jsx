import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const PubMccPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubMcc');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.mccCode,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.mccChannel, dataIndex: 'mccChannel', width: 200,render(text) {
          let txt = '';
          switch (text) {
            case 'UnionPay': txt = bizMap['mccChannel-01']; break;
            case 'AliPay': txt = bizMap['mccChannel-02']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.mccCode, dataIndex: 'mccCode', width: 200 },
      { title: bizMap.mccCls, dataIndex: 'mccCls', width: 350 },
      {
        title: bizMap.mccUnistdrat, dataIndex: 'mccUnistdrat', render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['mccUnistdrat-01']; break;
            case '2': txt = bizMap['mccUnistdrat-02']; break;
            case '3': txt = bizMap['mccUnistdrat-03']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
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
    scroll: { x: 1200 },
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

PubMccPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

PubMccPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default PubMccPageTable;
