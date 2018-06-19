import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const PaperBlackListPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('rms/paperBlackList');
  const paperBizMap = i18n.bizMap('rms/paper');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.paperId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.chnId, dataIndex: 'chnId', width: 150 },
      { title: paperBizMap.paperId, dataIndex: 'paperId', width: 150 },
      {
        title: paperBizMap.paperTyp, dataIndex: 'paperTyp', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = paperBizMap['paperTyp-01']; break;
            case '02': txt = paperBizMap['paperTyp-02']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.listTyp, dataIndex: 'listTyp', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['listTyp-0']; break;
            case '1': txt = bizMap['listTyp-1']; break;
            case '2': txt = bizMap['listTyp-2']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.operTim, dataIndex: 'operTim', width: 150, render(text) {
        return <span title={text}>{formatDateString(text)}</span>;
   }, },
      { title: bizMap.operId, dataIndex: 'operId', width: 150 },
      { title: bizMap.logId, dataIndex: 'logId' },
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

PaperBlackListPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

PaperBlackListPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
}

export default PaperBlackListPageTable;
