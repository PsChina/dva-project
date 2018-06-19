import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => {};

const ChnChkSumPageTable = (props) => {
  const {
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange,
    handlerShowSucDetail,

  } = props;
  const bizMap = i18n.bizMap('sms/chnChkSum');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const tableProps = {
    rowKey: record => record.chkSumId,
    tableColumns: [
      { title: bizMap.chnBuzType, dataIndex: 'chnBuzType', width: 100, render(text, record) {
        let txt = '';
        switch (text) {
          case '0100': txt = bizMap['chnBuzType-0100']; break;
          case '0001': txt = bizMap['chnBuzType-0001']; break;
          case '1000': txt = bizMap['chnBuzType-1000']; break;
          default: break;
        }
        if (record.txnChannel) {
          switch (record.txnChannel) {
            case '0001': txt += `-${bizMap['txnChannel-0001']}`; break;
            case '0002': txt += `-${bizMap['txnChannel-0002']}`; break;
            case '0003': txt += `-${bizMap['txnChannel-0003']}`; break;
            case '0004': txt += `-${bizMap['txnChannel-0004']}`; break;
            case '1011': txt += `-${bizMap['txnChannel-1011']}`; break;
            case '1012': txt += `-${bizMap['txnChannel-1012']}`; break;
            default: break;
          }
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 120 },
      { title: bizMap.chkDat, dataIndex: 'chkDat', width: 120, render(text) {
        const txt = date.formatDateString(text);
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.ccyCod, dataIndex: 'ccyCod', width: 100, render(text) {
        let txt = '';
        currency.forEach((v) => {
          if (v.value === text) {
            txt = v.label;
          }
        });
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.chkTotCnt, dataIndex: 'chkTotCnt', width: 120 },
      { title: bizMap.chkTotAmt, dataIndex: 'chkTotAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.sucTotCnt, dataIndex: 'sucTotCnt', width: 120, render(text, record) {
        return (
          <span>
            <a onClick={() => { handlerShowSucDetail(record); }}>
              {text}
            </a>
          </span>
        );
      } },
      { title: bizMap.sucTotAmt, dataIndex: 'sucTotAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.errTotCnt, dataIndex: 'errTotCnt', width: 120 },
      { title: bizMap.errTotAmt, dataIndex: 'errTotAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.doubtTotCnt, dataIndex: 'doubtTotCnt', width: 120 },
      { title: bizMap.doubtTotAmt, dataIndex: 'doubtTotAmt', width: 120, render(text, record) {
        const ccy = ccyMap[record.ccyCod] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.ccyCod), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
    ],
    scroll: { x: 1024 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tableCheckbox: false,
    tablePageChange(next) {
      tablePageChange(next);
    },

  };

  return (<PageTable {...tableProps} />);
}

ChnChkSumPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,

  handlerShowSucDetail: PropTypes.func,
};

ChnChkSumPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,

  handlerShowSucDetail: noop,
};

export default ChnChkSumPageTable;
