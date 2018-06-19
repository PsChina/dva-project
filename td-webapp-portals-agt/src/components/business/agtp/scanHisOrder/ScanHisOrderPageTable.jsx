import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import { cent2Yuan } from '../../../../utils/currency';

const noop = () => { };

const ScanHisOrderPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, handleDetailClick } = props;
  const bizMap = i18n.bizMap('agtp/scanOrder');
  const dataMap = i18n.bizMap('agtp/scanData');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.txnNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.txnNo, dataIndex: 'txnNo', width: 100 },
      { title: bizMap.terNo, dataIndex: 'terNo', width: 100 },
      { title: bizMap.merNo, dataIndex: 'merNo', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },
      { title: bizMap.braName, dataIndex: 'braName', width: 100 },
      { title: bizMap.agtName, dataIndex: 'agtName', width: 100 },
      { title: bizMap.txnAmt, dataIndex: 'txnAmt', width: 100, render: (text) => { return cent2Yuan(text); } },
      { title: bizMap.currency, dataIndex: 'currency', width: 100 },
      {
        title: bizMap.txnChannel, dataIndex: 'txnChannel', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0001': txt = dataMap['txnChannel-0001']; break;
            case '0002': txt = dataMap['txnChannel-0002']; break;
            case '0003': txt = dataMap['txnChannel-0003']; break;
            case '0004': txt = dataMap['txnChannel-0004']; break;
            case '1011': txt = dataMap['txnChannel-1011']; break;
            case '1012': txt = dataMap['txnChannel-1012']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.txnType, dataIndex: 'txnType', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'S': txt = dataMap['txnType-S']; break;
            case 'A': txt = dataMap['txnType-A']; break;
            case 'C': txt = dataMap['txnType-C']; break;
            case 'R': txt = dataMap['txnType-R']; break;
            case 'P': txt = dataMap['txnType-P']; break;
            case 'T': txt = dataMap['txnType-T']; break;
            case 'U': txt = dataMap['txnType-U']; break;
            case 'M': txt = dataMap['txnType-M']; break;
            case 'E': txt = dataMap['txnType-E']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.txnTime, dataIndex: 'txnTime', width: 100, render: (text) => { return formatDateString(text); } },
      { title: bizMap.txnRate, dataIndex: 'txnRate', width: 100 },
      { title: bizMap.chnFeeLim, dataIndex: 'chnFeeLim', width: 100, render: (text) => { return cent2Yuan(text); } },
      { title: bizMap.txnFee, dataIndex: 'txnFee', width: 100, render: (text) => { return cent2Yuan(text); } },
      {
        title: bizMap.txnStatus, dataIndex: 'txnStatus', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = dataMap['txnStatus-0']; break;
            case 'S': txt = dataMap['txnStatus-S']; break;
            case 'C': txt = dataMap['txnStatus-C']; break;
            case 'R': txt = dataMap['txnStatus-R']; break;
            case 'T': txt = dataMap['txnStatus-T']; break;
            case 'F': txt = dataMap['txnStatus-F']; break;
            case 'E': txt = dataMap['txnStatus-E']; break;
            case 'P': txt = dataMap['txnStatus-P']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 100 },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1700 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

ScanHisOrderPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  handleDetailClick: PropTypes.func,
};

ScanHisOrderPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  handleDetailClick: noop,
}

export default ScanHisOrderPageTable;
