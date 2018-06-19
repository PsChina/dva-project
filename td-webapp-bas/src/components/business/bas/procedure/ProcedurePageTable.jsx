import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => {};

const ProcedurePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDeleteClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/procedure');
  const bizMapModel = i18n.bizMap('bas/modelMain');
  const bizMapPosition = i18n.bizMap('bas/position');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.nodeno,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMapModel.modelname, dataIndex: 'modelname', width: 150 },
      { title: bizMap.nodename, dataIndex: 'nodename', width: 150 },
      { title: bizMap.status, dataIndex: 'status', width: 100, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: break;
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: bizMapPosition.positioncode, dataIndex: 'positioncode', width: 150 },
      { title: bizMapPosition.positionname, dataIndex: 'positionname', width: 150 },
      { title: bizMap.createobj, dataIndex: 'createobj', width: 100 },
      { title: bizMap.createdate, dataIndex: 'createdate', width: 100, render: (text) => { return formatDateString(text); } },
      { title: bizMap.updateobj, dataIndex: 'updateobj', width: 100 },
      { title: bizMap.updatedate, dataIndex: 'updatedate', render: (text) => { return formatDateString(text); } },
      { title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleDeleteClick(record); }}>{commonMap.delete}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1300 },
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

ProcedurePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
};

ProcedurePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
  handleViewProcessClick: noop,
  handleDeleteClick: noop,
}

export default ProcedurePageTable;
