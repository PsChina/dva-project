import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => {};

const ModelMainPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDeleteClick, handleUpdateClick, handleViewProcessClick, handleToProcesskClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/modelMain');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.modelno,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.modelname, dataIndex: 'modelname', width: 100 },
      { title: bizMap.systemno, dataIndex: 'systemno', width: 100 },
      { title: bizMap.modeltype, dataIndex: 'modeltype', width: 150 },
      { title: bizMap.status, dataIndex: 'status', width: 80, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: break;
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: bizMap.createobj, dataIndex: 'createobj', width: 170 },
      { title: bizMap.createdate, dataIndex: 'createdate', width: 150, render: (text) => { return formatDateString(text); } },
      { title: bizMap.updateobj, dataIndex: 'updateobj', width: 170 },
      { title: bizMap.updatedate, dataIndex: 'updatedate', render: (text) => { return formatDateString(text); } },
      { title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleViewProcessClick(record); }}>{bizMap.viewProcess}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleToProcesskClick(record); }}>{bizMap.toProcess}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleDeleteClick(record); }}>{commonMap.delete}</a>
          </span>
        );
      } },
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

ModelMainPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleViewProcessClick: PropTypes.func,
  handleToProcesskClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
};

ModelMainPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
  handleViewProcessClick: noop,
  handleToProcesskClick: noop,
  handleDeleteClick: noop,
}

export default ModelMainPageTable;
