import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const PubMessagePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleResendClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubMessage');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.MSG_ID,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.stitle, dataIndex: 'STITLE', width: 150 },
      {
        title: bizMap.sendChannel, dataIndex: 'SEND_CHANNEL', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['sendChannel-00']; break;
            case '01': txt = bizMap['sendChannel-01']; break;
            case '02': txt = bizMap['sendChannel-02']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.receiver, dataIndex: 'RECEIVER', width: 200 },
      {
        title: bizMap.sstate, dataIndex: 'SSTATE', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['sstate-00']; break;
            case '01': txt = bizMap['sstate-01']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.sendTim, dataIndex: 'SEND_TIM' },
      {
        title: commonMap.action, fixed: 'right', width: 150, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleResendClick(record); }}>{bizMap.resend}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1000 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

PubMessagePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleResendClick: PropTypes.func,
};

PubMessagePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleResendClick: noop,
}

export default PubMessagePageTable;
