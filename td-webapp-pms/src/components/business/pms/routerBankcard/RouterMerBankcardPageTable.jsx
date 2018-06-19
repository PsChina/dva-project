import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const RouterMerBankcardPageTable = (props) => {
  const { routerTableList, routerTableTotal, routerTableCurrentPage, routerTableFooter, routerTableLoading, tablePageChange, tableRowSelect, handleSetDefaultClick, handleDeleteClick, routerPayloadCurrency } = props;
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
  const modBizMap = i18n.bizMap('pms/routerMod');
  const commonMap = i18n.commonMap();
  const tableProps = {
    tableCheckbox: false,
    rowKey: record => record.chnMerNo + record.chnId + record.txnChannel + record.routeCurrency,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.merId, dataIndex: 'merId', width: 150 },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 150 },
      { title: bizMap.chnMerNo, dataIndex: 'chnMerNo', width: 150 },
      { title: bizMap.chnMerName, dataIndex: 'chnMerName', width: 150 },
      {
        title: bizMap.isDefault, dataIndex: 'isDefault', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['isDefault-1']; break;
            case '0': txt = bizMap['isDefault-0']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      // txnChannel
      {
        title: bizMap.chnMerType, dataIndex: 'chnMerType', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['chnMerType-1']; break;
            case '2': txt = bizMap['chnMerType-2']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: modBizMap.modNo, dataIndex: 'modNo' },
      {
        title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
          const data = Object.assign(record, { currency: routerPayloadCurrency.currency });
          let operSpan;
          if (record.modNo) {
            operSpan = (
              <span>
                <a hidden={record.isDefault === '1'} onClick={() => { handleSetDefaultClick(record); }}>{bizMap.setDefault}</a>
              </span>
            )
          } else {
            operSpan = (
              <span>
                <a hidden={record.issuestate === '1'} onClick={() => { handleSetDefaultClick(record); }}>{bizMap.setDefault}</a>
                <span className="ant-divider" />
                <a onClick={() => { handleDeleteClick(data); }}>{commonMap.delete}</a>
              </span>
            )
          }
          return operSpan;
        },
      },
    ],
    scroll: { x: true },
    tableList: routerTableList,
    tableTotal: routerTableTotal,
    tableCurrentPage: routerTableCurrentPage,
    tableLoading: routerTableLoading,
    footer: routerTableFooter,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

RouterMerBankcardPageTable.propTypes = {
  routerTableList: PropTypes.array,
  routerTableTotal: PropTypes.number,
  routerTableCurrentPage: PropTypes.number,
  routerTableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleSetDefaultClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  routerTableFooter: PropTypes.func,
};

RouterMerBankcardPageTable.defaultProps = {
  routerTableList: [],
  routerTableTotal: 0,
  routerTableCurrentPage: 1,
  routerTableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleSetDefaultClick: noop,
  handleDeleteClick: noop,
  routerTableFooter: noop,
}

export default RouterMerBankcardPageTable;
