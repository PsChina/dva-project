import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const MenuPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/menu');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.menuId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.chnId, dataIndex: 'chnId', width: 150 },
      { title: bizMap.menuName, dataIndex: 'menuName', width: 150 },
      { title: bizMap.menuDesc, dataIndex: 'menuDesc', width: 150 },
      {
        title: bizMap.menuStatus, dataIndex: 'menuStatus', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: break;
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      {
        title: bizMap.sysFrom, dataIndex: 'sysId', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '000': txt = commonMap['sysId-000']; break;
            case '001': txt = commonMap['sysId-001']; break;
            case '100': txt = commonMap['sysId-100']; break;
            case '101': txt = commonMap['sysId-101']; break;
            case '102': txt = commonMap['sysId-102']; break;
            case '103': txt = commonMap['sysId-103']; break;
            case '104': txt = commonMap['sysId-104']; break;
            case '200': txt = commonMap['sysId-200']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.menuUrl, dataIndex: 'menuUrl', width: 250 },
      { title: bizMap.creObjName, dataIndex: 'creObjName', width: 150 },
      { title: bizMap.creTim, dataIndex: 'creTim', render: (text) => { return formatDateString(text); } },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
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
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

MenuPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

MenuPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default MenuPageTable;
