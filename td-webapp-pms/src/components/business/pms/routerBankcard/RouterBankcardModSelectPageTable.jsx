import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const RouterBankcardModSelectPageTable = (props) => {
  const { routerApplyModalTableList, routerApplyModalTableTotal, routerApplyModalTableCurrentPage, routerApplyModalTableLoading, tablePageChange, tableRowSelect, handleApplyClick, routerPayloadMerInfo } = props;
  const bizMap = i18n.bizMap('pms/routerMod');
  const commonMap = i18n.commonMap();
  const tableProps = {
    tableCheckbox: false,
    rowKey: record => record.modNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.modNo, dataIndex: 'modNo', width: 90 },
      { title: bizMap.modName, dataIndex: 'modName', width: 150 },
      {
        title: bizMap.txnChannel, dataIndex: 'txnChannel', render(text) {
          let txt = '';
          switch (text) {
            case '0001': txt = bizMap['txnChannel-0001']; break;
            case '0002': txt = bizMap['txnChannel-0002']; break;
            case '0003': txt = bizMap['txnChannel-0003']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
          const data = Object.assign(record, { merId: routerPayloadMerInfo.merId });
          let span;
          if (routerPayloadMerInfo.modNo !== '' && routerPayloadMerInfo.modNo === record.modNo) {
            span = (
              <span>
                {bizMap.modApplying}
              </span>
            )
          } else {
            span = (
              <span>
                <a onClick={() => { handleApplyClick(data); }}>{bizMap.applyMod}</a>
              </span>
            )
          }
          return span;
        },
      },
    ],
    scroll: { x: true },
    tableList: routerApplyModalTableList,
    tableTotal: routerApplyModalTableTotal,
    tableCurrentPage: routerApplyModalTableCurrentPage,
    tableLoading: routerApplyModalTableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

RouterBankcardModSelectPageTable.propTypes = {
  routerApplyModalTableList: PropTypes.array,
  routerApplyModalTableTotal: PropTypes.number,
  routerApplyModalTableCurrentPage: PropTypes.number,
  routerApplyModalTableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleApplyClick: PropTypes.func,
};

RouterBankcardModSelectPageTable.defaultProps = {
  routerApplyModalTableList: [],
  routerApplyModalTableTotal: 0,
  routerApplyModalTableCurrentPage: 1,
  routerApplyModalTableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleApplyClick: noop,
}

export default RouterBankcardModSelectPageTable;
