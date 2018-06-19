import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const AnnouncementPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('merp/announcement');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.annId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.title, dataIndex: 'title', width: 200 },
      { title: bizMap.content, dataIndex: 'content', width: 300 },
      {
        title: bizMap.priority, dataIndex: 'priority', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['priority-01']; break;
            case '02': txt = bizMap['priority-02']; break;
            case '03': txt = bizMap['priority-03']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.annType, dataIndex: 'annType', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '000': txt = bizMap['annType-000']; break;
            case '001': txt = bizMap['annType-001']; break;
            case '002': txt = bizMap['annType-002']; break;
            case '003': txt = bizMap['annType-003']; break;
            case '004': txt = bizMap['annType-004']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.issuestate, dataIndex: 'issuestate', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['issuestate-0']; break;
            case '1': txt = bizMap['issuestate-1']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.publishTime, dataIndex: 'publishTime', render: (text) => { return formatDateString(text); } },
      {
        title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1200 },
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

AnnouncementPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
};

AnnouncementPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
}

export default AnnouncementPageTable;
