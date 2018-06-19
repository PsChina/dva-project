import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const PubUnionfitPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubUnionfit');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.binctt + record.issno,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.binctt, dataIndex: 'binctt', width: 100 },
      { title: bizMap.issnam, dataIndex: 'issnam', width: 100 },
      { title: bizMap.issno, dataIndex: 'issno', width: 100 },
      { title: bizMap.crdnam, dataIndex: 'crdnam', width: 100 },
      { title: bizMap.crdctt, dataIndex: 'crdctt', width: 100 },
      { title: bizMap.crdcrk, dataIndex: 'crdcrk', width: 100 },
      { title: bizMap.binoff, dataIndex: 'binoff', width: 100 },
      { title: bizMap.binlen, dataIndex: 'binlen', width: 100 },
      { title: bizMap.bincrk, dataIndex: 'bincrk', width: 100 },
      {
        title: bizMap.dcflag, dataIndex: 'dcflag', render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['dcflag-01']; break;
            case '02': txt = bizMap['dcflag-02']; break;
            case '03': txt = bizMap['dcflag-03']; break;
            case '04': txt = bizMap['dcflag-04']; break;
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
    scroll: { x: 1300 },
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

PubUnionfitPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

PubUnionfitPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default PubUnionfitPageTable;
