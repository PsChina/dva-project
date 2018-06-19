import React, { PropTypes } from 'react';
import { Popconfirm, Icon } from 'antd';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalParamTempPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, handleConfigClick } = props;
  const bizMap = i18n.bizMap('tms/terminalParamTemp');
  const cascaderTerTyp = i18n.bizMap('tms/cascaderTerTyp');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.tempId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.tempId, dataIndex: 'tempId', width: 100 },
      { title: bizMap.tempName, dataIndex: 'tempName', width: 100 },
      {
        title: bizMap.tempType, dataIndex: 'tempType', width: 100, render(text, record) {
          let labelStr = '';
          cascaderTerTyp.map((option, idx) => {
            if (option.value === record.tempType) {
              labelStr = option.label;
            }
          });
          return labelStr;
          /*return bizMap[`tempType-${record.tempType}`];*/
        },
      },
      {
        title: commonMap.action, width: 100, render(text, record) {
          return (
            <span>
              <Popconfirm title={bizMap.deleteTempConfirm} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel}>
                <a onClick={() => { handleDeleteClick(record); }}><Icon type="delete" /></a>
              </Popconfirm>
              <span className="ant-divider" />
              <a onClick={() => { handleConfigClick(record); }}><Icon type="select" /></a>
            </span>
          );
        },
      },
    ],
    tableCheckbox: false,
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(next);
    },
    // tableRowSelect(selectedRows) {
    //   tableRowSelect(selectedRows);
    // },
  };

  return (<PageTable {...tableProps} />);
}

TerminalParamTempPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  // tableRowSelect: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleDeleteConfirm: PropTypes.func,
  handleDeleteCancel: PropTypes.func,
  handleConfigClick: PropTypes.func,
};

TerminalParamTempPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  // tableRowSelect: noop,
  handleDeleteClick: noop,
  handleDeleteConfirm: noop,
  handleDeleteCancel: noop,
  handleConfigClick: noop,
}

export default TerminalParamTempPageTable;
