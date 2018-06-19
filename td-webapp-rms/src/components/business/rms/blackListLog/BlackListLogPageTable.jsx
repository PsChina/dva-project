import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const BlackListLogPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('rms/blackListLog');
  const tableProps = {
    rowKey: record => record.logId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.objId, dataIndex: 'objId', width: 150 },
      {
        title: bizMap.blackLogTyp, dataIndex: 'blackLogTyp', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['blackLogTyp-01']; break;
            case '02': txt = bizMap['blackLogTyp-02']; break;
            case '03': txt = bizMap['blackLogTyp-03']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.objTyp, dataIndex: 'objTyp', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['objTyp-01']; break;
            case '02': txt = bizMap['objTyp-02']; break;
            case '03': txt = bizMap['objTyp-03']; break;
            case '04': txt = bizMap['objTyp-04']; break;
            case '05': txt = bizMap['objTyp-05']; break;
            case '06': txt = bizMap['objTyp-06']; break;
            case '07': txt = bizMap['objTyp-07']; break;
            case '99': txt = bizMap['objTyp-99']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.operTim, dataIndex: 'operTim', width: 150, render(text) {
        return <span title={text}>{formatDateString(text)}</span>;
         }, 
      },
      { title: bizMap.operId, dataIndex: 'operId', width: 150 },
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

BlackListLogPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

BlackListLogPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
}

export default BlackListLogPageTable;

