import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const BankCardBlackListPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('rms/bankCardBlackList');
  const bankCardBizMap = i18n.bizMap('rms/bankCard');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.bankCardNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.chnId, dataIndex: 'chnId', width: 150 },
      { title: bankCardBizMap.bankCardNo, dataIndex: 'bankcardNo', width: 150 },
      {
        title: bankCardBizMap.bankCardType, dataIndex: 'bankcardTyp', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bankCardBizMap['bankCardType-01']; break;
            case '02': txt = bankCardBizMap['bankCardType-02']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.listType, dataIndex: 'listTyp', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['listType-0']; break;
            case '1': txt = bizMap['listType-1']; break;
            case '2': txt = bizMap['listType-2']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.creatTime, dataIndex: 'operTim', width: 150, render(text) {
        return <span title={text}>{formatDateString(text)}</span>;
   },},
      { title: bizMap.creatObject, dataIndex: 'operId', width: 150 },
      { title: bizMap.logId, dataIndex: 'logId' },
    ],
    scroll: { x: true },
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

BankCardBlackListPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

BankCardBlackListPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
}

export default BankCardBlackListPageTable;
