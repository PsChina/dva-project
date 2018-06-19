import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const TerminalAgentTermPageTable = (props) => {
  const { termTableCurrentPage, termTableList, termTableTotal, termTableLoading, termTablePageChange, termTableRowSelect, handleTermDetailClick, handleTermUnBindClick } = props;
  const bizMap = i18n.bizMap('agtp/terminal');
  const agtMap = i18n.bizMap('agtp/terminalAgent');
  const dataMap = i18n.bizMap('agtp/tmsData');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.terId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terId, dataIndex: 'terId', width: 150 },
      { title: bizMap.terPhyno, dataIndex: 'terPhyno', width: 150 },
      {
        title: bizMap.terTyp, dataIndex: 'terTyp', render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = dataMap['terTyp-01']; break;
            case '02': txt = dataMap['terTyp-02']; break;
            case '03': txt = dataMap['terTyp-03']; break;
            case '04': txt = dataMap['terTyp-04']; break;
            case '05': txt = dataMap['terTyp-05']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: commonMap.action, width: 50, fixed: 'right', render(text, record) {
          return (
            <span>
              <a onClick={() => { handleTermDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleTermUnBindClick(record); }}>{commonMap.unBind}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
    tableList: termTableList,
    tableTotal: termTableTotal,
    tableCurrentPage: termTableCurrentPage,
    tableLoading: termTableLoading,
    tablePageChange(next) {
      termTablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      termTableRowSelect(selectedRows);
    },
    footer: termTableTotal > 0 ? () => { return `${agtMap.agtName} : ${termTableList[0].terAgtName}  ${agtMap.agtId} : ${termTableList[0].terAgtId}`; } : undefined,
  };

  return (
    <PageTable {...tableProps} />
  );
}

TerminalAgentTermPageTable.propTypes = {
  termTableCurrentPage: PropTypes.number,
  termTableList: PropTypes.array,
  termTableTotal: PropTypes.number,
  termTableLoading: PropTypes.bool,
  termTablePageChange: PropTypes.func,
  termTableRowSelect: PropTypes.func,
  handleTermDetailClick: PropTypes.func,
};

TerminalAgentTermPageTable.defaultProps = {
  termTableCurrentPage: 1,
  termTableList: [],
  termTableTotal: 0,
  termTableLoading: false,
  termTablePageChange: noop,
  termTableRowSelect: noop,
  termTandleDetailClick: noop,
  handleTermDetailClick: noop,
}

export default TerminalAgentTermPageTable;
