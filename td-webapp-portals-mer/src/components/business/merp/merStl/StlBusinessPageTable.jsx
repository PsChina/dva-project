import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => {};

const StlBusinessPageTable = (props) => {
  const {
    businessTableList,
    businessTableTotal,
    businessTableCurrentPage,
    businessTableLoading,
    businessTablePageChange,
    businessTableRowSelect,
    businessHandleDetailClick,
    businessHandleStlDetailClick,
  } = props;

  const bizMap = i18n.bizMap('merp/stlBusiness');
  const ccyMap = i18n.bizMap('currencyMap');
  const commonMap = i18n.commonMap();
  // console.log('businessTableList........', businessTableList);
  const tableProps = {
    rowKey: record => record.ID,
    tableColumns: [
      { title: '', dataIndex: 'NULL', width: 120 },
      {
        title: bizMap.busiTyp, dataIndex: 'BUSI_TYP', width: 120, render(text) {
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
      { title: bizMap.stlAmt, dataIndex: 'STL_AMT', width: 120, render(text, record) {
        const ccy = ccyMap[record.CCY] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.CCY), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.begClrDat, dataIndex: 'BEG_CLR_DAT', width: 120, render(text) {
        const txt = date.formatDateString(text);
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.endClrDat, dataIndex: 'END_CLR_DAT', width: 120, render(text) {
        const txt = date.formatDateString(text);
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.txnTotCnt, dataIndex: 'TXN_TOT_CNT', width: 120 },
      { title: bizMap.txnTotAmt, dataIndex: 'TXN_TOT_AMT', width: 120, render(text, record) {
        const ccy = ccyMap[record.CCY] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.CCY), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: bizMap.txnTotFee, dataIndex: 'TXN_TOT_FEE', render(text, record) {
        const ccy = ccyMap[record.CCY] || ccyMap.DEFAULT;
        const txt = formatMoney(amtMinUnitToStandUnit(text, record.CCY), 2) + ccy;
        return <span title={txt}>{txt}</span>;
      },
      },
      { title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
        return (
          <span>
            <a onClick={() => { businessHandleDetailClick(record); }}>{bizMap.businessDetail}</a>
            <span className="ant-divider" />
            <a onClick={() => { businessHandleStlDetailClick(record); }}>{bizMap.stlDetlOper}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 900 },
    tableList: businessTableList,
    tableTotal: businessTableTotal,
    tableCurrentPage: businessTableCurrentPage,
    tableLoading: businessTableLoading,
    tableCheckbox: false,
    pagination: false,
    tablePageChange(next) {
      businessTablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      businessTableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

StlBusinessPageTable.propTypes = {
  businessTableList: PropTypes.array,
  businessTableTotal: PropTypes.number,
  businessTableCurrentPage: PropTypes.number,
  businessTableLoading: PropTypes.bool,
  businessTablePageChange: PropTypes.func,

  businessHandleDetailClick: PropTypes.func,
};

StlBusinessPageTable.defaultProps = {
  businessTableList: [],
  businessTableTotal: 0,
  businessTableCurrentPage: 1,
  businessTableLoading: false,
  businessTablePageChange: noop,

  businessHandleDetailClick: noop,
};

export default StlBusinessPageTable;
