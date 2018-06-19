import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const PubBankPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleSubDetailClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubBank');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.bankNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.bankNo, dataIndex: 'bankNo', width: 100 },
      { title: bizMap.bankName, dataIndex: 'bankName', width: 100 },
      { title: bizMap.bankCode, dataIndex: 'bankCode' },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleSubDetailClick(record); }}>{bizMap.subDetail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 470 },
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

PubBankPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleSubDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

PubBankPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleSubDetailClick: noop,
  handleUpdateClick: noop,
}

export default PubBankPageTable;
