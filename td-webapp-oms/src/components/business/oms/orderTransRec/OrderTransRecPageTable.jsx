import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };
const OrderTransRecPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, handleDetailClick, handleTransferOrderClick, handleOrderDetailClick } = props;
  const bizMap = i18n.bizMap('oms/orderTransRec');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.seqNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.seqNo, dataIndex: 'seqNo', width: 100, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleOrderDetailClick(record); }}>{text}</a>
            </span>
          );
        },
      },
      { title: bizMap.txnNo, dataIndex: 'txnNo', width: 100 },
      { title: bizMap.merNo, dataIndex: 'merNo', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },
      { title: bizMap.freezeStatus, dataIndex: 'freezeStatus', width: 100 },
      { title: bizMap.cardType, dataIndex: 'cardType', width: 100 },
      { title: bizMap.txnType, dataIndex: 'txnType', width: 100 },
      { title: bizMap.cardNo, dataIndex: 'cardNo', width: 100 },
      { title: bizMap.txnAmt, dataIndex: 'txnAmt', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.currency); } },
      { title: bizMap.currency, dataIndex: 'currency', width: 100 },
      { title: bizMap.tsrefno, dataIndex: 'tsrefno', width: 100 },
      { title: bizMap.otxnNo, dataIndex: 'otxnNo', width: 100 },
      { title: bizMap.txnStatus, dataIndex: 'txnStatus', width: 100 },
      { title: bizMap.validDate, dataIndex: 'validDate', width: 100, render: (text) => { return formatDateString(text); } },
      { title: bizMap.operTim, dataIndex: 'operTim', render: (text) => { return formatDateString(text); } },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleTransferOrderClick(record); }} >{bizMap.transRec}</a>
            </span>
          );
        },
      },
    ],
    rowSelection: null,
    scroll: { x: 1880 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

OrderTransRecPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleTransferOrderClick: PropTypes.func,
  handleOrderDetailClick: PropTypes.func,
};

OrderTransRecPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  handleDetailClick: noop,
  handleTransferOrderClick: noop,
  handleOrderDetailClick: noop,
}

export default OrderTransRecPageTable;
