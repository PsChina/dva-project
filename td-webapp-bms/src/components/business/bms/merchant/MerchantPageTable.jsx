import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const MerchantPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tableCurrentPage, tablePageChange, tableRowSelect, handleConfigClick } = props;
  const bizMap = i18n.bizMap('bms/merchant');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.merId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.merId, dataIndex: 'merId', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },
      { title: bizMap.agtName, dataIndex: 'agtName', width: 100 },
      {
        title: bizMap.merStatus, dataIndex: 'merStatus', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      {
        title: bizMap.merType, dataIndex: 'merType', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['merType-0']; break;
            case '1': txt = bizMap['merType-1']; break;
            case '2': txt = bizMap['merType-2']; break;
            case '3': txt = bizMap['merType-3']; break;
            case '4': txt = bizMap['merType-4']; break;
            case '5': txt = bizMap['merType-5']; break;
            case '6': txt = bizMap['merType-6']; break;
            case '7': txt = bizMap['merType-7']; break;
            case '8': txt = bizMap['merType-8']; break;
            case '9': txt = bizMap['merType-9']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.merCate, dataIndex: 'merCate', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['merCate-0']; break;
            case '1': txt = bizMap['merCate-1']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      { title: bizMap.bizLic, dataIndex: 'bizLic', width: 100 },
      { title: bizMap.bizSale, dataIndex: 'bizSale', width: 100 },
      { title: bizMap.addTim, dataIndex: 'addTim', width: 100 },
      { title: bizMap.appCompTime, dataIndex: 'appCompTime' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleConfigClick(record); }}>{bizMap.configBiz}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1440 },
    tableCheckbox: false,
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

MerchantPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tableCurrentPage: PropTypes.number,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleConfigClick: PropTypes.func,
};

MerchantPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tableCurrentPage: 1,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleConfigClick: noop,
}

export default MerchantPageTable;
