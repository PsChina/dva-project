import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import * as number from '../../../../../utils/number';
import * as date from '../../../../../utils/date';

const noop = () => { };

/**
 * 分润table list
 */
const StlShrPageTable = (props) => {
  const {
    tablePageChange,
    tableLoading,
    tableList,
    tableTotal,
    tableCurrentPage,
    tableRowSelect,
    handleDetailClick,
    handleQueryListClick,
  } = props;
  const bizMap = i18n.bizMap('agtp/stlShr');
  const commonMap = i18n.commonMap();

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      {
        title: bizMap.shrDat, dataIndex: 'shrDat', width: 120, render(text) {
          return date.formatDateString(text);
        },
      },
      {
        title: bizMap.busiTyp, dataIndex: 'busiTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0100': txt = commonMap.onlineinternet; break;
            case '0001': txt = commonMap.unionpaycard; break;
            case '0002': txt = commonMap.visa; break;
            case '0003': txt = commonMap.mastercard; break;
            case '0004': txt = commonMap.prepaidcard; break;
            case '1011': txt = commonMap.alipay; break;
            case '1012': txt = commonMap.wechat; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.clrTyp, dataIndex: 'clrTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['clrTyp-01']; break;
            case '02': txt = bizMap['clrTyp-02']; break;
            case '03': txt = bizMap['clrTyp-03']; break;
            case '04': txt = bizMap['clrTyp-04']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.pyeMemName, dataIndex: 'pyeMemName', width: 120 },
      {
        title: bizMap.ccy, dataIndex: 'ccy', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'CNY': txt = bizMap['ccyCod-CNY']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.shrAmt, dataIndex: 'shrAmt', width: 120, render(text) {
          let txt = '';
          txt = number.fmoney(text);
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.fstShrCost, dataIndex: 'fstShrCost', width: 120, render(text) {
          let txt = '';
          txt = number.fmoney(text);
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.fstShrPrin, dataIndex: 'fstShrPrin', width: 120, render(text) {
          let txt = '';
          txt = number.fmoney(text);
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.txnTotCnt, dataIndex: 'txnTotCnt', width: 120 },
      {
        title: bizMap.txnTotAmt, dataIndex: 'txnTotAmt', width: 120, render(text) {
          let txt = '';
          txt = number.fmoney(text);
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.txnTotFee, dataIndex: 'txnTotFee', width: 120, render(text) {
          let txt = '';
          txt = number.fmoney(text);
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.shrSts, dataIndex: 'shrSts', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['shrSts-01']; break;
            case '1': txt = bizMap['shrSts-02']; break;
            case '2': txt = bizMap['shrSts-03']; break;
            case '3': txt = bizMap['shrSts-04']; break;
            case '4': txt = bizMap['shrSts-05']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 80, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleQueryListClick(record); }}>{bizMap.transactionDetail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tableCheckbox: true,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} scroll={{ x: 1200 }} />);
}

StlShrPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,

  handleDetailClick: PropTypes.func,
  handleQueryListClick: PropTypes.func,
};

StlShrPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,

  handleDetailClick: noop,
  handleQueryListClick: noop,
};

export default StlShrPageTable;
