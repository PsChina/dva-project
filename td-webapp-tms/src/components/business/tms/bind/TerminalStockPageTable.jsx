import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const TerminalStockPageTable = (props) => {
  const { addModalTableCurrentPage, addModalTableList, addModalTableTotal, addModalTableLoading, addModalTablePageChange, addModalTableRowSelect, addModalTableFooter } = props;
  const bizMap = i18n.bizMap('tms/terminalStock');
  const dataMap = i18n.bizMap('tms/tmsData');
  const cascaderTerTyp = i18n.bizMap('tms/cascaderTerTyp');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.terId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terId, dataIndex: 'terId', width: 100 },
      { title: bizMap.terPhyno, dataIndex: 'terPhyno', width: 100 },
      {
        title: bizMap.terTyp, dataIndex: 'terTyp', width: 100, render(text) {
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
        title: bizMap.stoStatus, dataIndex: 'stoStatus', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = dataMap['stoStatus-0']; break;
            case '1': txt = dataMap['stoStatus-1']; break;
            case '2': txt = dataMap['stoStatus-2']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.terAddAmt, dataIndex: 'terAddAmt', width: 100, render(text, record) { return text && record.terAddCur ? amtMinUnitToStandUnit(text, record.terAddCur) : ''; } },
      { title: bizMap.terOutAmt, dataIndex: 'terOutAmt', width: 100, render(text, record) { return text && record.terOutCur ? amtMinUnitToStandUnit(text, record.terOutCur) : ''; } },
      {
        title: bizMap.terSrc, dataIndex: 'terSrc', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = dataMap['terSrc-1']; break;
            case '2': txt = dataMap['terSrc-2']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.addDat, dataIndex: 'addDat', width: 100, render: (text) => { return formatDateString(text); } },
      { title: bizMap.outDat, dataIndex: 'outDat', width: 100, render: (text) => { return formatDateString(text); } },
      {
        title: bizMap.terOwn, dataIndex: 'terOwn', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['org-1']; break;
            case '2': txt = commonMap['org-2']; break;
            case '3': txt = commonMap['org-3']; break;
            case '4': txt = commonMap['org-4']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.copNam, dataIndex: 'copNam', width: 100 },
      { title: bizMap.terModNo, dataIndex: 'terModNo', width: 100 },
      { title: bizMap.verNo, dataIndex: 'verNo', width: 100 },
    ],
    scroll: { x: 1600 },
    tableList: addModalTableList,
    tableTotal: addModalTableTotal,
    tableLoading: addModalTableLoading,
    tableCurrentPage: addModalTableCurrentPage,
    tablePageChange(next) {
      addModalTablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      addModalTableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

TerminalStockPageTable.propTypes = {
  addModalTableCurrentPage: PropTypes.number,
  addModalTableList: PropTypes.array,
  addModalTableTotal: PropTypes.number,
  addModalTableLoading: PropTypes.bool,
  addModalTablePageChange: PropTypes.func,
  addModalTableRowSelect: PropTypes.func,
};

TerminalStockPageTable.defaultProps = {
  addModalTableCurrentPage: 1,
  addModalTableList: [],
  addModalTableTotal: 0,
  addModalTableLoading: false,
  addModalTablePageChange: noop,
  addModalTableRowSelect: noop,
}

export default TerminalStockPageTable;
