import React, { PropTypes } from 'react';
import PageTable from '../PageTable';
import * as i18n from '../../../utils/i18n';

const noop = () => {};

const TerModNoPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableCurrentPage, clickCallback } = props;
  const bizMap = i18n.bizMap('tms/terminal');
  const terTypMap = i18n.bizMap('tms/tmsData');
  const tableProps = {
    rowKey: record => record.terModId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terModNo, dataIndex: 'terModNo', width: 100 },
      { title: bizMap.copNam, dataIndex: 'copNam' },
      { title: bizMap.merType, dataIndex: 'terTyp', width: 100, render: (text) => {
        let txt = '';
        switch (text) {
          case '01': txt = terTypMap['terTyp-01']; break;
          case '02': txt = terTypMap['terTyp-02']; break;
          case '03': txt = terTypMap['terTyp-03']; break;
          case '04': txt = terTypMap['terTyp-04']; break;
          case '05': txt = terTypMap['terTyp-05']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
    ],
    scroll: { y: 240 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    onRowClick(record) {
      clickCallback(record);
    },
  };
  return (<PageTable {...tableProps} />);
};

TerModNoPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

TerModNoPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default TerModNoPageTable;

