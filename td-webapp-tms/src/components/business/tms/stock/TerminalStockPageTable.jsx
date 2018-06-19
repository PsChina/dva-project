import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const TerminalStockPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleQueryLogsClick } = props;
  const bizMap = i18n.bizMap('tms/terminalStock');
  const dataMap = i18n.bizMap('tms/tmsData');
  const typeList = i18n.bizMap('tms/cascaderTerTyp');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.terId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.terId, dataIndex: 'terId', width: 100 },
      { title: bizMap.terPhyno, dataIndex: 'terPhyno', width: 100 },
      {
        title: bizMap.terTyp, dataIndex: 'terTypName', width: 100, render(text, record) {
          let txt = '';
          for (let index = 0; index < typeList.length; index++) {
            if (typeList[index].value === record.terTyp) {
              txt = typeList[index].label;
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
            case '0': txt = <font color="#5FBC29">{dataMap['stoStatus-0']}</font>; break;
            case '1': txt = <font color="#00A0E8">{dataMap['stoStatus-1']}</font>; break;
            case '2': txt = <font color="#E01515">{dataMap['stoStatus-2']}</font>; break;
            default: txt = '';
          }
          return txt;
        },
      },
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
      {
        title: bizMap.terInAmt, dataIndex: 'terAddAmt', width: 100, render(text, record) {
          let amt = '';
          switch (record.terSrc) {
            case '1': amt = record.terAddAmt && record.terAddCur ? amtMinUnitToStandUnit(record.terAddAmt, record.terAddCur) : ''; break;
            case '2': amt = record.terNetinAmt && record.terAddCur ? amtMinUnitToStandUnit(record.terNetinAmt, record.terAddCur) : ''; break;
            default: amt = text; break;
          }
          return amt;
        },
      },
      { title: bizMap.terAddCur, dataIndex: 'terAddCur', width: 100 },
      { title: bizMap.terOutAmt, dataIndex: 'terOutAmt', width: 100, render(text, record) { return text && record.terOutCur ? amtMinUnitToStandUnit(text, record.terOutCur) : ''; } },
      { title: bizMap.terOutCur, dataIndex: 'terOutCur', width: 100 },
      { title: bizMap.addDat, dataIndex: 'addDat', width: 150, render: (text) => { return formatDateString(text); } },
      { title: bizMap.outDat, dataIndex: 'outDat', width: 150, render: (text) => { return formatDateString(text); } },
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
      { title: bizMap.verNo, dataIndex: 'verNo' },
      {
        title: commonMap.action, width: 180, fixed: 'right', render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleQueryLogsClick(record); }}>{bizMap.log}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1700 },
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

TerminalStockPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleQueryLogsClick: PropTypes.func,
};

TerminalStockPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleQueryLogsClick: noop,
}

export default TerminalStockPageTable;
