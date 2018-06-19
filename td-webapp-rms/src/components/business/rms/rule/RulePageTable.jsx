import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};

const RulePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleInfoClick, handleDetailClick, handleAddClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();

  const tableProps = {
    rowKey: record => record.tmpId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.tmpId, dataIndex: 'tmpId' },
      { title: bizMap.tmpType, dataIndex: 'tmpType',
        render(text) {
          return commonMap[`tmpType-${text}`];
        },
      },
      { title: bizMap.tmpName, dataIndex: 'tmpName' },
      { title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleAddClick(record); }}>{bizMap.addRule}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleInfoClick(record); }}>{bizMap.configMes}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 850 },
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

RulePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleAddClick: PropTypes.func,
  handleInfoClick: PropTypes.func,
};

RulePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleAddClick: noop,
  handleInfoClick: noop,
}

export default RulePageTable;
