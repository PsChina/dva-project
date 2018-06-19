import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const DubboServicesPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleProAndConsLinkClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/dubbo');
  // const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.id,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.name, dataIndex: 'name', width: 1000 },
      {
        title: bizMap.providers, dataIndex: 'providers', width: 150, render(text, record, key) {
          return (
            <a href="javascript:void(0)" onClick={() => { handleProAndConsLinkClick(text, record, key, true) }}>{bizMap.see}</a>);
        },
      },
      {
        title: bizMap.consumners, dataIndex: 'consumners', width: 150, render(text, record, key) {
          return (
            <a href="javascript:void(0)" onClick={() => { handleProAndConsLinkClick(text, record, key, true) }}>{bizMap.see}</a>);
        },
      },
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

DubboServicesPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleProAndConsLinkClick: PropTypes.func,
};

DubboServicesPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleProAndConsLinkClick: noop,
}

export default DubboServicesPageTable;
