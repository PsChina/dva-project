import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import cascaderTerTyp from '../../../../../config/i18n/zh-cn/merp/cascaderTerTyp.json';

const noop = () => { };
const bizMap = i18n.bizMap('merp/terminal');
const commonMap = i18n.commonMap();

const TerminalFirmwarePageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateAuthClick } = props;
  const tableProps = {
    rowKey: record => record.terId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terPhyno, dataIndex: 'terPhyno', width: 120 },
      { title: bizMap.terNo, dataIndex: 'terNo', width: 100 },
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
      { title: bizMap.terBraId, dataIndex: 'terBraId', width: 200 },
      { title: bizMap.braName, dataIndex: 'terBraName', width: 200 },
      {
        title: bizMap.terStatue, dataIndex: 'terStatue', width: 80, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      // { title: bizMap.merName, dataIndex: 'terMerName', width: 120 },
      // { title: bizMap.agtName, dataIndex: 'terAgtName', width: 120 },
      {
        title: commonMap.action, witdh: 100, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              {/*<span className="ant-divider" />
              <a onClick={() => { handleUpdateAuthClick(record); }}>{bizMap.terminalAuth}</a>*/}
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

TerminalFirmwarePageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateAuthClick: PropTypes.func,
};

TerminalFirmwarePageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateAuthClick: noop,
}

export default TerminalFirmwarePageTable;
