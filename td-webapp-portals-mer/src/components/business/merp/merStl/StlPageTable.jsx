import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => {};

const ChnChkStlPageTable = (props) => {
  const {
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange,
    handleDetailClick,
    handleStlDetailClick,
    handleOrdDetailClick,
    tableRowSelect,
    handleTradeDetailListClick,
  } = props;

  const bizMap = i18n.bizMap('merp/stling');
  const commonMap = i18n.commonMap();
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const displayShowHidden = {
    style: { display: 'none' },
  }

  const tableProps = {
    rowKey: record => record.id,
    tableColumns: [
      { title: bizMap.stlDat, dataIndex: 'stlDat', width: 120, render(text) {
        const txt = date.formatDateString(text);
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
      {
        title: bizMap.stlMod, dataIndex: 'stlMod', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['stlMod-c']; break;
            case '1': txt = bizMap['stlMod-n']; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.stlTyp, dataIndex: 'stlTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['stlTyp-t']; break;
            case '1': txt = bizMap['stlTyp-d']; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.clrTyp, dataIndex: 'clrTyp', width: 80, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap.individualMem; break;
            case '02': txt = bizMap.merchantman; break;
            case '03': txt = bizMap.store; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.pyeMemName, dataIndex: 'pyeMemName', width: 120 },
      {
        title: bizMap.ccy, dataIndex: 'ccy', width: 120, render(text) {
          let txt = '';
          currency.forEach((v) => {
            if (v.value === text) {
              txt = v.label;
            }
          });
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.stlAmt, dataIndex: 'stlAmt', width: 80, render(text, record) {
        const ccy = ccyMap[record.CCY] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text || '0', record.ccy), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      } },
      {
        title: bizMap.stlSts, dataIndex: 'stlSts', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap.stlSuccessSts; break;
            case '1': txt = bizMap.stlToAudit; break;
            case '2': txt = bizMap.stlAuditFail; break;
            case '3': txt = bizMap.stlToApplyForMoney; break;
            case '4': txt = bizMap.stlCancel; break;
            case '5': txt = bizMap.stlUnsettled; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: commonMap.action, width: 50, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span {...(record.stlMod === '0' || record.disabled === 'disabled' ? null : displayShowHidden)}>
              <span className="ant-divider" />
              <a onClick={() => { handleTradeDetailListClick(record); }}>{bizMap.ordDetlOper}</a>
            </span>
            <span {...(record.stlMod === '0' || record.disabled === 'disabled' ? null : displayShowHidden)}>
              <span className="ant-divider" />
              <a onClick={() => { handleStlDetailClick(record); }}>{bizMap.stlDetlOper}</a>
            </span>
            <span {...((record.stlMod === '1' && record.stlWayAct === '2') ? null : displayShowHidden)}>
              <span className="ant-divider" />
              <a onClick={() => { handleOrdDetailClick(record); }}>{bizMap.ordDetlOper}</a>
            </span>
          </span>
        );
      } },
    ],
    scroll: { x: 950 },
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

  return (<PageTable {...tableProps} />);
}

ChnChkStlPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleStlDetailClick: PropTypes.func,
};

ChnChkStlPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  handleDetailClick: noop,
  handleStlDetailClick: noop,
};

export default ChnChkStlPageTable;
