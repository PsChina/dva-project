import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };

const BankcardOrderPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleTransferOrderClick } = props;
  const bizMap = i18n.bizMap('merp/bankcardOrder');
  const dataMap = i18n.bizMap('merp/omsData');
  const commonMap = i18n.commonMap();
  const getStulSts = (status) => {
    let STATUS = '';
    if (status === '0') {
      STATUS = <font color="#E01515">{dataMap['status-0']}</font>;
    } else if (status === '1') {
      STATUS = <font color="#E01515">{dataMap['status-1']}</font>;
    } else {
      STATUS = dataMap['status-2'];
    }
    return STATUS;
  };
  const tableProps = {
    rowKey: record => record.txnNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.txnNo, dataIndex: 'txnNo', width: 100 },
      { title: bizMap.terNo, dataIndex: 'terNo', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },
      { title: bizMap.braName, dataIndex: 'braName', width: 100 },
      { title: bizMap.agtName, dataIndex: 'agtName', width: 100 },
      { title: bizMap.txnAmt, dataIndex: 'txnAmt', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.currency); } },
      { title: bizMap.currency, dataIndex: 'currency', width: 100 },
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
      { title: bizMap.txnTime, dataIndex: 'txnTime', width: 100, render: (text) => { return formatDateString(text); } },
      { title: bizMap.txnRate, dataIndex: 'txnRate', width: 100 },
      { title: bizMap.chnFeeLim, dataIndex: 'chnFeeLim', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.currency); } },
      { title: bizMap.txnFee, dataIndex: 'txnFee', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.currency); } },
      { title: bizMap.cardNo, dataIndex: 'cardNo', width: 100 },
      {
        title: bizMap.cardType, dataIndex: 'cardType', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = dataMap['cardType-01']; break;
            case '02': txt = dataMap['cardType-02']; break;
            case '03': txt = dataMap['cardType-03']; break;
            case '04': txt = dataMap['cardType-04']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.cardIssinam, dataIndex: 'cardIssinam', width: 100 },
      { title: bizMap.tseqNo, dataIndex: 'tseqNo', width: 100 },
      { title: bizMap.tsrefno, dataIndex: 'tsrefno', width: 100 },
      { title: bizMap.tautcod, dataIndex: 'tautcod', width: 100 },
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
      {
        title: bizMap.freezeStatus, dataIndex: 'freezeStatus', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = dataMap['freezeStatus-0']; break;
            case '1': txt = dataMap['freezeStatus-1']; break;
            case '2': txt = dataMap['freezeStatus-2']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.clearStatus, dataIndex: 'clearStatus', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = dataMap['clearStatus-0']; break;
            case '1': txt = dataMap['clearStatus-1']; break;
            case '2': txt = dataMap['clearStatus-2']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.chnName, dataIndex: 'chnName' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleTransferOrderClick(record); }} >{getStulSts(text.status)}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 2580 },
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

BankcardOrderPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleTransferOrderClick: PropTypes.func,
};

BankcardOrderPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleTransferOrderClick: noop,
}

export default BankcardOrderPageTable;
