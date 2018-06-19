import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };

const StlBusinessAccDetailTable = (props) => {
  const {
        businessStlTableList,
        businessStlTableTotal,
        businessStlTableCurrentPage,
        businessStlTableLoading,
        businessStlTablePageChange,
  } = props;

  const bizMap = i18n.bizMap('merp/clearingSum');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const commonMap = i18n.commonMap();

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      { title: bizMap.clrNum, dataIndex: 'id', width: 120 },
      {
        title: bizMap.clrTyp, dataIndex: 'clrTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['clrTyp-01']; break;
            case '02': txt = bizMap['clrTyp-02']; break;
            case '03': txt = bizMap['clrTyp-03']; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
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
      { title: bizMap.pyeMemName, dataIndex: 'pyeMemName', width: 120 },
      {
        title: bizMap.ccy, dataIndex: 'ccy', width: 100, render(text) {
          let txt = '';
          currency.forEach((v) => {
            if (v.value === text) {
              txt = v.label;
            }
          });
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.clrDat, dataIndex: 'clrDat', width: 120, render(text) {
        const txt = date.formatDateString(text);
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.txnTotCnt, dataIndex: 'txnTotCnt', width: 120 },
      {
        title: bizMap.txnTotAmt, dataIndex: 'txnTotAmt', width: 120, render(text, record) {
          const ccy = ccyMap[record.CCY] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text || '0', record.CCY), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.txnTotFee, dataIndex: 'txnTotFee', width: 120, render(text, record) {
          const ccy = ccyMap[record.CCY] || ccyMap.DEFAULT;
          const txt = formatMoney(amtMinUnitToStandUnit(text || '0', record.CCY), 2) + ccy;
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.stlDat, dataIndex: 'stlDat', width: 120, render(text) {
        const txt = date.formatDateString(text);
        return <span title={txt}>{txt}</span>;
      },
      },
      {
        title: bizMap.stlSts, dataIndex: 'stlSts', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['stlSts-01']; break;
            case '1': txt = bizMap['stlSts-02']; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
    ],
    scroll: { x: 1000 },
    tableList: businessStlTableList,
    tableTotal: businessStlTableTotal,
    tableCurrentPage: businessStlTableCurrentPage,
    tableLoading: businessStlTableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      businessStlTablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

StlBusinessAccDetailTable.propTypes = {
  businessStlTableList: PropTypes.array,
  businessStlTableTotal: PropTypes.number,
  businessStlTableCurrentPage: PropTypes.number,
  businessStlTableLoading: PropTypes.bool,
  businessStlTablePageChange: PropTypes.func,
};

StlBusinessAccDetailTable.defaultProps = {
  businessStlTableList: [],
  businessStlTableTotal: 0,
  businessStlTableCurrentPage: 1,
  businessStlTableLoading: false,
  businessStlTablePageChange: noop,
};

export default StlBusinessAccDetailTable;
