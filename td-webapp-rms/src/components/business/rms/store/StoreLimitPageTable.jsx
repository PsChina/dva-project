import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => {};

const StoreLimitPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('rms/storeLimit');
  const ccyMap = i18n.bizMap('currencyMap');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.braId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.braId, dataIndex: 'braId', width: 100 },
      { title: bizMap.limitStatus, dataIndex: 'limitStatus', width: 80, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.braOneLimitAmt, dataIndex: 'braOneLimitAmt', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.ccy) + ccyMap[record.ccy]; } },
      { title: bizMap.braOneTopAmt, dataIndex: 'braOneTopAmt', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.ccy) + ccyMap[record.ccy]; } },
      { title: bizMap.braDayTopAmt, dataIndex: 'braDayTopAmt', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.ccy) + ccyMap[record.ccy]; } },
      { title: bizMap.braMonTopAmt, dataIndex: 'braMonTopAmt', width: 100, render: (text, record) => { return amtMinUnitToStandUnit(text, record.ccy) + ccyMap[record.ccy]; } },
      { title: bizMap.braDayTopCount, dataIndex: 'braDayTopCount', width: 100 },
      { title: bizMap.braMonTopCount, dataIndex: 'braMonTopCount', width: 100 },
      { title: bizMap.addTim, dataIndex: 'addTim', width: 170, render: (text) => { return formatDateString(text); } },
      { title: bizMap.updTim, dataIndex: 'updTim', width: 150, render: (text) => { return formatDateString(text); } },
      { title: bizMap.operId, dataIndex: 'operId' },
      { title: commonMap.action, fixed: 'right', width: 200, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1600 },
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

StoreLimitPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

StoreLimitPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default StoreLimitPageTable;
