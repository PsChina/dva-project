import React, { PropTypes } from 'react';
import { Form } from 'antd';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalBankcardPageTable = (props) => {
  const {
    tableList,
    tableTotal,
    tableLoading,
    tablePageChange,
    tableCurrentPage,
    handleDetailClick,
    handleKeyUpdateClick,
    tableRowSelect,
   } = props;
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('pms/terminalBankcard');
  const tableProps = {
    rowKey: record => `${record.chnTermNo}${record.chnMerNo}${record.chnId}`,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.chnTermNo, dataIndex: 'chnTermNo', width: 150, render(text) {
        let txt = '';
        switch (text) {
          case 'null':txt = ''; break;
          default: txt = text; break;
        }
        return <span title={txt}>{txt}</span>;
      },},
      { title: bizMap.chnMerName, dataIndex: 'chnMerName', width: 150 },
      {
        title: bizMap.chnMerType, dataIndex: 'chnMerType', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['chnMerType-1']; break;
            case '2': txt = bizMap['chnMerType-2']; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.chnMerNo, dataIndex: 'chnMerNo', width: 150 },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 150 },
      {
        title: bizMap.chnType, dataIndex: 'chnType', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['chnType-0']; break;
            case '1': txt = bizMap['chnType-1']; break;
            case '2': txt = bizMap['chnType-2']; break;
            default: txt = ''; break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.termStatus, dataIndex: 'termStatus', render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: txt = ''; break;
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 150, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{bizMap.keyDetail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleKeyUpdateClick(record); }}>{bizMap.updateKeyInfo}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1150 },
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
  return (
    <PageTable {...tableProps} />
  );
};

TerminalBankcardPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableCurrentPage: PropTypes.number,
  handleDetailClick: PropTypes.func,
  handleKeyUpdateClick: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

TerminalBankcardPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableCurrentPage: 1,
  handleDetailClick: noop,
  handleKeyUpdateClick: noop,
  tableRowSelect: noop,
};

export default Form.create()(TerminalBankcardPageTable);
