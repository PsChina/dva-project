import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalModelPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick } = props;
  const bizMap = i18n.bizMap('tms/terminalModel');
  const cascaderTerTyp = i18n.bizMap('tms/cascaderTerTyp');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.terModId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.copNam, dataIndex: 'copNam', width: 200 },
      { title: bizMap.terModNo, dataIndex: 'terModNo', width: 200 },
      {
        title: bizMap.terTyp, dataIndex: 'terTyp', render(text) {
          let txt = '';
          for (let index = 0; index < cascaderTerTyp.length; index++) {
            if (cascaderTerTyp[index].value === text) {
              txt = cascaderTerTyp[index].label;
              break;
            }
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.terSubTyp, dataIndex: 'terSubTyp', render(text, record) {
          let txt = '';
          for (let index = 0; index < cascaderTerTyp.length; index++) {
            if (cascaderTerTyp[index].value === record.terTyp) {
              const subTypeData = cascaderTerTyp[index].children;
              for (let subIndex = 0; subIndex < subTypeData.length; subIndex++) {
                if (subTypeData[subIndex].value === text) {
                  txt = subTypeData[subIndex].label;
                  break;
                }
              }
            }
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            </span>
          );
        },
      },
    ],
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

TerminalModelPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

TerminalModelPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
}

export default TerminalModelPageTable;
